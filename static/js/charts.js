async function cargarGraficoLine() {
  try {
    const respuesta = await fetch('http://127.0.0.1:5000/get-avis-day');

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datosJson = await respuesta.json();

    const MS_POR_DIA = 24 * 60 * 60 * 1000;
    const hoy = new Date();
    const fin = Date.UTC(
      hoy.getUTCFullYear(),
      hoy.getUTCMonth(),
      hoy.getUTCDate()
    );

    const fechaInicio = new Date(fin);
    fechaInicio.setUTCFullYear(fechaInicio.getUTCFullYear() - 1);
    const inicio = fechaInicio.getTime();

    // Guarda los counts por día UTC.
    const valoresPorDia = new Map();

    datosJson.forEach((registro) => {
      const fechaParseada = Date.parse(registro.fecha);

      if (Number.isNaN(fechaParseada)) {
        return;
      }

      const fecha = new Date(fechaParseada);
      const dia = Date.UTC(
        fecha.getUTCFullYear(),
        fecha.getUTCMonth(),
        fecha.getUTCDate()
      );

      if (dia >= inicio && dia <= fin) {
        const count = Number(registro['COUNT(*)']) || 0;
        valoresPorDia.set(dia, (valoresPorDia.get(dia) || 0) + count);
      }
    });

    // Añade los días ausentes con count = 0.
    const datos = [];

    for (let dia = inicio; dia <= fin; dia += MS_POR_DIA) {
      datos.push([dia, valoresPorDia.get(dia) || 0]);
    }

    Highcharts.chart('line-chart', {
        chart: {
            type: 'line',
            backgroundColor:'#fff'
        },

        title: {
            text: ''
        },

        xAxis: {
            type: 'datetime',
            min: inicio,
            max: fin,
            lineColor: '#000',
            tickColor: '#000',
            labels: {
                style: {
                    color: '#000'
                }
            }
        },

        yAxis: {
            title: {
                text: 'Cantidad',
                style: {
                    color:'#000' 
                }
            },
            min: 0,
            allowDecimals: false,
            labels: {
                style: {
                    color: '#000'
                }
            }
        },

        tooltip: {
            xDateFormat: '%e %B %Y',
            pointFormat: '<b>{point.y}</b>'
        },

        series: [{
            name: 'Avisos',
            data: datos,
            color: '#78d261',
            marker: {
            enabled: false
            }
        }]
        });
    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
    }
}

async function cargarGraficoPie() {
    try {
        const respuesta = await fetch();
    }
}

cargarGraficoLine();