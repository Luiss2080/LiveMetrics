import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { configuracionBarras } from '../../configuracion/d3Config'
import './GraficoBarras.css'

function GraficoBarras({ datos }) {
  const svgRef = useRef()

  useEffect(() => {
    if (datos.length === 0) return

    const { margen, ancho, altura, colorBarra, colorBarraHover, opacidad, opacidadHover, padding } = configuracionBarras
    
    const anchoGrafico = ancho - margen.izquierda - margen.derecha
    const alturaGrafico = altura - margen.superior - margen.inferior

    // Limpiar SVG anterior
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', ancho)
      .attr('height', altura)
      .append('g')
      .attr('transform', `translate(${margen.izquierda},${margen.superior})`)

    // Escala X
    const escalaX = d3.scaleBand()
      .domain(datos.map((_, i) => i))
      .range([0, anchoGrafico])
      .padding(padding)

    // Escala Y
    const escalaY = d3.scaleLinear()
      .domain([0, 100])
      .range([alturaGrafico, 0])

    // Eje X
    svg.append('g')
      .attr('transform', `translate(0,${alturaGrafico})`)
      .call(d3.axisBottom(escalaX))
      .attr('color', '#ffffff')
      .selectAll('text')
      .style('font-size', '11px')

    // Eje Y
    svg.append('g')
      .call(d3.axisLeft(escalaY))
      .attr('color', '#ffffff')
      .selectAll('text')
      .style('font-size', '11px')

    // Líneas de grid horizontal
    svg.selectAll('.grid-line')
      .data(escalaY.ticks(5))
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', anchoGrafico)
      .attr('y1', d => escalaY(d))
      .attr('y2', d => escalaY(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 1)

    // Barras
    svg.selectAll('.barra')
      .data(datos)
      .enter()
      .append('rect')
      .attr('class', 'barra')
      .attr('x', (_, i) => escalaX(i))
      .attr('y', d => escalaY(d.cpu))
      .attr('width', escalaX.bandwidth())
      .attr('height', d => alturaGrafico - escalaY(d.cpu))
      .attr('fill', colorBarra)
      .attr('opacity', opacidad)
      .attr('rx', 4)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('opacity', opacidadHover)
          .attr('fill', colorBarraHover)
        
        // Tooltip
        svg.append('text')
          .attr('class', 'tooltip-barras')
          .attr('x', escalaX(datos.indexOf(d)) + escalaX.bandwidth() / 2)
          .attr('y', escalaY(d.cpu) - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')
          .text(`${d.cpu}%`)
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('opacity', opacidad)
          .attr('fill', colorBarra)
        
        svg.selectAll('.tooltip-barras').remove()
      })

    // Etiqueta del eje Y
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margen.izquierda)
      .attr('x', 0 - (alturaGrafico / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '13px')
      .attr('font-weight', '500')
      .text('CPU Usage (%)')

  }, [datos])

  return (
    <div className="contenedor-grafico-barras">
      <h2 className="contenedor-grafico-barras__titulo">
        📊 Gráfico de Barras Interactivo
      </h2>
      <div className="contenedor-grafico-barras__svg">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}

export default GraficoBarras
