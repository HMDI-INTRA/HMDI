//****Autor: Josélio Dias Mendonça*******//

import DataModel from '../models/DataModel.js';
import View from '../views/View.js';
import Services from '../controllers/Services.js';
import Validate from '../models/Validate.js';
import Utils from './Utils.js';

class Controller {
  constructor(model, view, services) {
    this.model = model;
    this.view = view;
    this.services = services;
    this.deleteButton = this.view.excluirTecnico;
    this.isLoadingData = false;
    this.model.fetchData('../services/api/weather_api.php', this.previsaoTempo);
    Utils.setupInterval(this.dateTime.bind(this), 100);
  }

  async init() {
    this.nivelAcesso()
    if (window.location.pathname.includes('dashboard.php')) {
      this.atualizarDados();
      this.atualizarGrafico();
    }
    if (document.querySelectorAll('.nav-link-button')) {
      this.navLinkButton();
    }
  }

  async nivelAcesso() {
    let accessElement = document.getElementById("acesso");
    if (accessElement) {
      let accessLevel = accessElement.innerHTML.trim();
      switch (accessLevel) {
        case "Arquivo":
          if (!window.location.pathname.includes('arquivo.php')) {
            $("#body").remove();
          }
          break;
        case "Laboratorio":
          if (!window.location.pathname.includes('laboratorio.php')) {
            $("#body").remove();
          } 
          break;
        default:
          break;
      }
    }
  }

  
  navLinkButton() {
    document.querySelectorAll('.nav-link-button').forEach(function (element) {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.tab-pane').forEach(function (tab) {
          tab.classList.remove('show');
        });
        document.querySelector(e.target.getAttribute('href')).classList.add('show');
        document.querySelectorAll('.nav-link-button').forEach(function (link) {
          link.classList.remove('active');
        });
        e.target.classList.add('active');
      });
    });
  }

  previsaoTempo = (data) => {
    this.view.renderWeather(data);
  }

  dateTime() {
    let datePtBr = new Date().toLocaleDateString("pt-br") + " - " + new Date().toLocaleTimeString("pt-br")
    datePtBr.toString()
    document.getElementById("time").innerHTML = datePtBr
  }

  async atualizarDados() {
    try {
      const jsonData = await this.model.fetchJsonData();
      const totalsByTecnico = {};
      const patrimoniosVencidos = [];
      const dataAtual = new Date();
      jsonData.forEach((item) => {
        const tecnico = item.tecnico;
        totalsByTecnico[tecnico] = (totalsByTecnico[tecnico] || 0) + 1;
        const dataProx = new Date(item.data_prox);
        if (dataProx < dataAtual) {
          patrimoniosVencidos.push(item);
        }
      });
      this.view.renderPreventivas(jsonData, patrimoniosVencidos, totalsByTecnico);
    } catch (error) {
    }
  }

  async atualizarGrafico() {
    await this.model.fetchChartData();
    this.view.renderChart(this.model.chartData);
  }
}

const DataModelInstance = new DataModel(); 
const ViewInstance = new View(); 
const ServicesInstance = new Services(); 
const ValidateInstace = new Validate(); 
const ControllerInstance = new Controller(DataModelInstance, ViewInstance, ServicesInstance, ValidateInstace);
ControllerInstance.init();