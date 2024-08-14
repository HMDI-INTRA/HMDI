//****Autor: Josélio Dias Mendonça*******//

class DataModel {
  constructor() {
    this.atualizarTabelaCallback = null;
    this.uniqueIPs = new Set();
    this.ipLastUpdated = {};
    this.historicoLimite = 1;
    this.data = null;
    this.chartData = null;
  }

  // Hostname ou Ip
  addUniqueIP(ip) {
    this.uniqueIPs.add(ip);
  }

  updateIPTime(ip, dataHora) {
    this.ipLastUpdated[ip] = dataHora;
  }

  //Grafico
  async fetchChartData() {
    try {
      const jsonData = await this.fetchJsonData();
      const preventivasPorMes = {};
  
      jsonData.forEach((item) => {
        const dataPrev = new Date(item.data_prev);
        const mes = dataPrev.getMonth();
        const ano = dataPrev.getFullYear();
        const key = `${mes + 1}/${ano}`;
        preventivasPorMes[key] = (preventivasPorMes[key] || 0) + 1;
      });

      const preventivasArray = Object.entries(preventivasPorMes);
  
      preventivasArray.sort((a, b) => {
        const [mesA, anoA] = a[0].split('/').map(Number);
        const [mesB, anoB] = b[0].split('/').map(Number);
  
        if (anoA === anoB) {
          return mesA - mesB;
        } else {
          return anoA - anoB;
        }
      });
  
      const mesesAnos = preventivasArray.map(([key]) => key);
      const totais = preventivasArray.map(([_, value]) => value);
  
      this.chartData = {
        labels: mesesAnos,
        datasets: [
          {
            label: 'Total de Preventivas',
            data: totais,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    } catch (error) {
      throw error;
    }
  }
  //////////////////////////////////////////////////////////////////////////-FETCH-//////////////////////////////////////////////////////////////////////////////////////////////////

  async fetchData(url, displayCallback) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const data = await response.json();
      displayCallback(data);
    } catch (error) {

    }
  }

  async fetchJsonData() {
    try {
      const response = await fetch('../services/api/request_tecnico.php');
      if (!response.ok) {
        throw new Error('Erro na solicitação.');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }

}

export default DataModel;
