import { SelectorMatcher } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';




@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  selectedDistrict1; 
  public chartColor;
  public chartEmail;
  public chartHours;

  listOptions = [
    { id: 0, name: "Geußnitz" },
    { id: 1, name: "Kayna" },
    { id: 2, name: "Luckenau" },
    { id: 3, name: "Nonnewitz" },
    { id: 4, name: "Würchwitz" },
    { id: 5, name: "Zangenberg" },
    { id: 6, name: "Zeitz" }
  ];

  zeitz = {
    einwohner: 22564,
    u25: {
      m: 2178,
      w: 1980,
    },

    b25_45: {
      m: 1876,
      w: 1971,

    },
    b45_65: {
      m: 3918,
      w: 3806,

    },
    u65: {
      m: 2700,
      w: 4135,
    }
  };


  geussnitz = {
    einwohner: 530,
    u25: {
      m: 46,
      w: 41,
    },

    b25_45: {
      m: 48,
      w: 30,

    },
    b45_65: {
      m:112,
      w: 94,

    },
    u65: {
      m: 60,
      w: 99,
    }
  };



  luckenau = {
    einwohner: 438,
    u25: {
      m: 44,
      w: 48,
    },

    b25_45: {
      m: 43,
      w: 31,

    },
    b45_65: {
      m: 57,
      w: 71,

    },
    u65: {
      m: 60,
      w: 84,
    }
  };

  kayna = {
    einwohner: 1155,
    u25: {
      m: 105,
      w: 98,
    },

    b25_45: {
      m: 96,
      w: 99,

    },
    b45_65: {
      m: 222,
      w: 190,

    },
    u65: {
      m: 139,
      w: 206,
    }
  };

  


  nonnewitz = {
    einwohner: 579,
    u25: {
      m: 62,
      w: 44,
    },

    b25_45: {
      m: 38,
      w: 44,

    },
    b45_65: {
      m: 108,
      w: 103,

    },
    u65: {
      m: 77,
      w: 103,
    }
  };



theissen = {
    einwohner: 1694,
    u25: {
      m: 164,
      w: 135,
    },

    b25_45: {
      m: 156,
      w: 137,

    },
    b45_65: {
      m: 269,
      w: 323,

    },
    u65: {
      m: 199,
      w: 311,
    }
  };


  wuerchwitz = {
    einwohner: 491,
    u25: {
      m: 53,
      w: 29,
    },

    b25_45: {
      m: 49,
      w: 43,

    },
    b45_65: {
      m: 82,
      w: 84,

    },
    u65: {
      m: 54,
      w: 97,
    }
  };

zangenberg = {
    einwohner: 335,
    u25: {
      m: 31,
      w: 29,
    },

    b25_45: {
      m: 29,
      w: 30,

    },
    b45_65: {
      m: 53,
      w: 52,

    },
    u65: {
      m: 50,
      w: 61,
    }
  }; 




    ngOnInit(){





    





      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Geußnitz", "Kayna", "Luckenau", "Nonnewitz", "Theißen", "Würchwitz", "Zangenberg", "Zeitz"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [( this.geussnitz.u25.m + this.geussnitz.u25.w ) / this.geussnitz.einwohner, (this.kayna.u25.m + this.kayna.u25.w)/ this.kayna.einwohner, ( this.luckenau.u25.m + this.luckenau.u25.w ) /this.luckenau.einwohner, ( this.nonnewitz.u25.m + this.nonnewitz.u25.w ) / this.nonnewitz.einwohner , ( this.theissen.u25.m + this.theissen.u25.w ) / this.theissen.einwohner, 
              ( this.wuerchwitz.u25.m + this.wuerchwitz.u25.w ) / this.wuerchwitz.einwohner, ( this.zangenberg.u25.m + this.zangenberg.u25.w ) / this.zangenberg.einwohner, ( this.zeitz.u25.m + this.zeitz.u25.w ) / this.zeitz.einwohner]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [( this.geussnitz.b25_45.m + this.geussnitz.b25_45.w ) / this.geussnitz.einwohner, (this.kayna.b25_45.m + this.kayna.b25_45.w)/ this.kayna.einwohner, ( this.luckenau.b25_45.m + this.luckenau.b25_45.w ) /this.luckenau.einwohner, ( this.nonnewitz.b25_45.m + this.nonnewitz.b25_45.w ) / this.nonnewitz.einwohner , ( this.theissen.b25_45.m + this.theissen.b25_45.w ) / this.theissen.einwohner, 
              ( this.wuerchwitz.b25_45.m + this.wuerchwitz.b25_45.w ) / this.wuerchwitz.einwohner, ( this.zangenberg.b25_45.m + this.zangenberg.b25_45.w ) / this.zangenberg.einwohner, ( this.zeitz.b25_45.m + this.zeitz.b25_45.w ) / this.zeitz.einwohner]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [( this.geussnitz.b45_65.m + this.geussnitz.b45_65.w ) / this.geussnitz.einwohner, (this.kayna.b45_65.m + this.kayna.b45_65.w)/ this.kayna.einwohner, ( this.luckenau.b45_65.m + this.luckenau.b45_65.w ) /this.luckenau.einwohner, ( this.nonnewitz.b45_65.m + this.nonnewitz.b45_65.w ) / this.nonnewitz.einwohner , ( this.theissen.b45_65.m + this.theissen.b45_65.w ) / this.theissen.einwohner, 
              ( this.wuerchwitz.b45_65.m + this.wuerchwitz.b45_65.w ) / this.wuerchwitz.einwohner, ( this.zangenberg.b45_65.m + this.zangenberg.b45_65.w ) / this.zangenberg.einwohner, ( this.zeitz.b45_65.m + this.zeitz.b45_65.w ) / this.zeitz.einwohner]
            },
            {
              borderColor: "#457ac0",
              backgroundColor: "#457ac0",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [( this.geussnitz.u65.m + this.geussnitz.u65.w ) / this.geussnitz.einwohner, (this.kayna.u65.m + this.kayna.u65.w)/ this.kayna.einwohner, ( this.luckenau.u65.m + this.luckenau.u65.w ) /this.luckenau.einwohner, ( this.nonnewitz.u65.m + this.nonnewitz.u65.w ) / this.nonnewitz.einwohner , ( this.theissen.u65.m + this.theissen.u65.w ) / this.theissen.einwohner, 
              ( this.wuerchwitz.u65.m + this.wuerchwitz.u65.w ) / this.wuerchwitz.einwohner, ( this.zangenberg.u65.m + this.zangenberg.u65.w ) / this.zangenberg.einwohner, ( this.zeitz.u65.m + this.zeitz.u65.w ) / this.zeitz.einwohner]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });
      this.selectedDistrict1 = this.zeitz;

      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['U25', '25-45', '45-65', '65+'],
          datasets: [{
            label: "Alterstruktur",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [this.selectedDistrict1.u25.m+this.selectedDistrict1.u25.w, this.selectedDistrict1.b25_45.m+this.selectedDistrict1.b25_45.w, this.selectedDistrict1.b45_65.m+this.selectedDistrict1.b45_65.w, this.selectedDistrict1.u65.m+this.selectedDistrict1.u65.w,]
          }]
        },

        options: {

          legend: {
            display: true
          },
          

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      }); 

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [this.zeitz.u25.w, this.zeitz.b25_45.w, this.zeitz.b45_65.w, this.zeitz.u65.w],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [this.zeitz.u25.m, this.zeitz.b25_45.m, this.zeitz.b45_65.m, this.zeitz.u65.m],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ['U25', '25-45', '45-65', '65+'],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }


    selectChange( $event) {
    

        switch($event) {
          case 0:

          this.selectedDistrict1 = this.geussnitz; 

          case 1:
            this.selectedDistrict1 = this.kayna; 
          case 2:
            this.selectedDistrict1 = this.luckenau; 
          case 3:
            this.selectedDistrict1 = this.nonnewitz; 
            case 4:
              this.selectedDistrict1 = this.wuerchwitz; 
              case 5:
                this.selectedDistrict1 = this.zangenberg;
                case 6:
                  this.selectedDistrict1 = this.zeitz;

     

        }

      console.log(this.selectedDistrict1); 


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['U25', '25-45', '45-65', '65+'],
          datasets: [{
            label: "Alterstruktur",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [this.selectedDistrict1.u25.m+this.selectedDistrict1.u25.w, this.selectedDistrict1.b25_45.m+this.selectedDistrict1.b25_45.w, this.selectedDistrict1.b45_65.m+this.selectedDistrict1.b45_65.w, this.selectedDistrict1.u65.m+this.selectedDistrict1.u65.w,]
          }]
        },

        options: {

          legend: {
            display: true
          },
          

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });
      
    }
}
