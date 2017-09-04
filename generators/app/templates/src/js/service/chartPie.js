/**
 * @desc 绘制甜甜圈图
 * @author	zjfh-chenjy
 * @param {id} canvas的id
 * @param {data} 绘制图形的数据
 * @param {legenddata} 图例数据
 * @version	1.0.00.0
 */


angular.module('myApp')
.factory('chartpie', [function() {
  var chartPie = function(id,data) {
    this.id = id;
    this.data = data;
    this.dataset = [];
    this.labels = [];
    this.optionset = {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: '# of Votes',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 0.4)'
                ],
                borderColor: [
                    'rgba(255,99,132,0)',
                    'rgba(54, 162, 235, 0)',
                    'rgba(255, 206, 86, 0)',
                    'rgba(75, 192, 192, 0)',
                    'rgba(0, 0, 0, 0)'
                ],
                borderWidth: 0
            }]
          },
            options: {
              legend: {
                display: true,
                labels:{
                  fontSize:8,
                  boxWidth:5
                },
                position:'bottom'
              },
              cutoutPercentage:70
            }
          };
          var _me =this;
          this.data.map(function(item) {
            _me.dataset.push(parseInt(item.finamount));
            _me.labels.push(item.finname);
          });
          this.optionset.data.labels = this.labels;
          this.optionset.data.datasets[0].data = this.dataset;
  };

  chartPie.prototype.getOptionset = function() {
    var myChart = new Chart(document.getElementById(this.id), this.optionset);
    return this.optionset;
  };
  return chartPie;
}]);
