import * as Highcharts from 'highcharts'

/**
 * @description Sets the deafult theme options for a hightcharts chart
 * @see {@link https://github.com/highcharts/highcharts/tree/master/js/themes HighCharts Github}
 */
export const setLightGridTheme = (): void => {
  Highcharts.createElement(
    'link',
    {
      href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {},
    document.getElementsByTagName('head')[0]
  )

  Highcharts.setOptions({
    colors: [
      '#7cb5ec',
      '#f7a35c',
      '#90ee7e',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ],
    chart: {
      backgroundColor: null,
      style: {
        fontFamily: 'Dosis, sans-serif'
      }
    },
    title: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(219,219,216,0.8)',
      shadow: false
    },
    legend: {
      // backgroundColor: '#F0F0EA',
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '13px'
      }
    },
    xAxis: {
      gridLineWidth: 1,
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      minorTickInterval: 'auto',
      title: {
        style: {
          textTransform: 'uppercase'
        }
      },
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    }
  })
}
