import { Component, OnInit } from '@angular/core';
import {AlphaVantageService} from '../../services/alpha-vantage.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-stock-viz-page',
  templateUrl: './stock-viz-page.component.html',
  styleUrls: ['./stock-viz-page.component.scss']
})
export class StockVizPageComponent implements OnInit {

  constructor(private alphaVantageService: AlphaVantageService) { }
  symbol: string;
  displaySymbol: string;
  svg: any;
  chart: any;
  response: any;
  chartData: any;
  showErrorMessage = false;

  ratio = 0.6;
  plotMargin = 2;
  width = window.innerWidth * this.ratio;
  height = window.innerHeight * this.ratio;
  margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };
  yScale: any;
  xScale: any;
  yMin: number;
  yMax: number;
  yAxis: any;
  xAxis: any;

  openLine: any;
  closeLine: any;
  highLine: any;
  lowLine: any;

  openCircle: any;
  closeCircle: any;
  highCircle: any;
  lowCircle: any;

  duration = 300;

  ngOnInit(): void {
    this.createChart();
    this.symbol = 'IBM';
    this.getStockPrices();
  }

  createChart(): void {
    this.svg = d3.select('#d3-chart-container')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.chart = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.openLine = this.addChartLine('open-line', 'blue');
    this.closeLine = this.addChartLine('close-line', 'black');
    this.highLine = this.addChartLine('high-line', 'green');
    this.lowLine = this.addChartLine('low-line', 'red');

    this.openCircle = this.addHoverCircle('open-circle', 'blue');
    this.closeCircle = this.addHoverCircle('close-circle', 'black');
    this.highCircle = this.addHoverCircle('high-circle', 'green');
    this.lowCircle = this.addHoverCircle('low-circle', 'red');

    this.xAxis = this.chart.append('g').attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (this.height - this.margin.bottom) + ')');

    this.yAxis = this.chart.append('g').attr('class', 'y-axis')
      .attr('transform', 'translate(' + this.margin.left + ',0)');
  }

  addChartLine(lineClass: string, color: string): void {
     return this.chart.append('path')
      .attr('class', lineClass)
      .attr('stroke', color)
      .style('stroke-width', 3)
      .style('stroke-linecap', 'round')
      .style('fill', 'none');
  }

  addHoverCircle(circleClass: string, color: string): void {
    return this.chart.append('circle')
      .attr('class', circleClass)
      .attr('stroke', color)
      .style('stroke-width', 3)
      .style('radius', 10)
      .style('fill', 'none')
      .style('opacity', 0);
  }

  getStockPrices(): void {
    this.alphaVantageService.getDailyPrices(this.symbol)
      .subscribe(data => {
        if (data.ErrorMessage) {
          this.showErrorMessage = true;
        } else {
          this.displaySymbol = this.symbol;
          this.response = data['Time Series (Daily)'];
          console.log(data);
          this.setupData();
          this.updateChart();
        }
      });
  }

  setupData(): void {
    this.chartData = [];
    for (const d in this.response) {
      if (this.response.hasOwnProperty(d)) {
        const point = this.response[d];
        const tmpObj = {
          open: point['1. open'],
          close: point['4. close'],
          high: point['2. high'],
          low: point['3. low'],
          date: d
        };
        this.chartData.push(tmpObj);
      }
    }
    this.chartData = this.chartData.slice(0, 14);
    this.yMax = parseFloat(d3.min(this.chartData.map(d => d.low)));
    this.yMin = parseFloat(d3.max(this.chartData.map(d => d.high)));
    console.log(this.chartData);
  }

  updateChart(): void {
    this.yScale = d3.scaleLinear().domain([Math.ceil(this.yMax) - this.plotMargin, Math.floor(this.yMin) + this.plotMargin])
        .rangeRound([this.height - this.margin.bottom, this.margin.top]);

    this.xScale = d3.scaleBand()
      .domain(this.chartData.map((d) => d.date).reverse())
      .range([this.margin.left, this.width - this.margin.right]);

    this.xAxis.transition().duration(this.duration).call(d3.axisBottom(this.xScale)
      .ticks(this.chartData.length));

    this.yAxis.transition().duration(this.duration).call(d3.axisLeft(this.yScale));

    const halfBand = this.xScale.bandwidth() / 2;
    const openLine = d3.line<any>().x(d => this.xScale(d.date) + halfBand).y(d => this.yScale(d.open)).curve(d3.curveNatural);
    const closeLine = d3.line<any>().x(d => this.xScale(d.date) + halfBand).y(d => this.yScale(d.close)).curve(d3.curveNatural);
    const highLine = d3.line<any>().x(d => this.xScale(d.date) + halfBand).y(d => this.yScale(d.high)).curve(d3.curveNatural);
    const lowLine = d3.line<any>().x(d => this.xScale(d.date) + halfBand).y(d => this.yScale(d.low)).curve(d3.curveNatural);

    this.openLine
      .datum(this.chartData)
      .transition().duration(this.duration)
      .attr('d', openLine);

    this.closeLine
      .datum(this.chartData)
      .transition().duration(this.duration)
      .attr('d', closeLine);

    this.highLine
      .datum(this.chartData)
      .transition().duration(this.duration)
      .attr('d', highLine);

    this.lowLine
      .datum(this.chartData)
      .transition().duration(this.duration)
      .attr('d', lowLine);

    this.chart.on('mouseover', () => {
      this.drawTooltip();
    });

  }

  drawTooltip(): void {
    // const date = this.xScale.invert(d3.mouse(this.chart));
    // const open = this.chartData.find(d => d.date === date).open;
    // const close = this.chartData.find(d => d.date === date).close;
    // const high = this.chartData.find(d => d.date === date).high;
    // const low = this.chartData.find(d => d.date === date).low;
    //
    // this.openCircle.transition()
    //   .attr('cx', this.xScale(date))
    //   .attr('cy', this.yScale(open))
    //   .style('opacity', 1);

  }
}
