import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { d3ConfigBarras } from '../../configuracion/d3Config';
import { formatearHora } from '../../utilidades/formateadores';
import './GraficoBarras.css';

const GraficoBarras = ({ historial }) => {
  const contenedorRef = useRef(null);
  
  useEffect(() => {
    if (!historial || historial.length === 0 || !contenedorRef.current) return;
    
    // Limpiar gráfico anterior
    d3.select(contenedorRef.current).selectAll('*').remove();
    
    const contenedor = contenedorRef.current;
    const ancho = contenedor.clientWidth;
    const alto = 250;
    const { top, right, bottom, left } = d3ConfigBarras.margen;
    
    // Crear SVG
    const svg = d3.select(contenedor)
      .append('svg')
      .attr('width', ancho)
      .attr('height', alto);
      
    // Escalas
    const x = d3.scaleBand()
      .range([left, ancho - right])
      .padding(0.2)
      .domain(historial.map(d => formatearHora(d.tiempo)));
      
    const y = d3.scaleLinear()
      .range([alto - bottom, top])
      .domain([0, d3.max(historial, d => d.peticiones) || 100]);
      
    // Ejes
    svg.append('g')
      .attr('transform', `translate(0,${alto - bottom})`)
      .call(d3.axisBottom(x).tickValues([])) // Ocultar labels de X para limpieza visual
      .selectAll('.domain, .tick line').attr('stroke', 'rgba(255,255,255,0.1)');
      
    svg.append('g')
      .attr('transform', `translate(${left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('.domain, .tick line').attr('stroke', 'rgba(255,255,255,0.1)')
      .selectAll('text').attr('fill', d3ConfigBarras.colorTexto);
      
    // Barras con transición
    svg.selectAll('.barra')
      .data(historial)
      .enter()
      .append('rect')
      .attr('class', 'barra')
      .attr('x', d => x(formatearHora(d.tiempo)))
      .attr('y', alto - bottom)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d3ConfigBarras.colorBarra)
      .attr('rx', 4) // bordes redondeados
      .transition()
      .duration(d3ConfigBarras.duracionAnimacion)
      .attr('y', d => y(d.peticiones))
      .attr('height', d => alto - bottom - y(d.peticiones));
      
  }, [historial]);

  return (
    <div className="grafico-barras panel-cristal">
      <h3 className="grafico-titulo">Peticiones por Segundo</h3>
      <div ref={contenedorRef} className="d3-contenedor"></div>
    </div>
  );
};

export default GraficoBarras;
