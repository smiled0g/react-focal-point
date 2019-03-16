import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class FocalPoint extends React.Component {
  static propTypes = {
    points: PropTypes.object,
    padding: PropTypes.number,
    borderRadius: PropTypes.number,
    onMaskClicked: PropTypes.func,
  }

  componentDidMount() {
    // Create a style tag to make the masked elements clickable later on
    this.styleTag = document.createElement('style')
    document.head.appendChild(this.styleTag)
    this.injectPointStyle()
  }

  componentDidUpdate(prevProps) {
    if (this.props.points !== prevProps.points) {
      this.injectPointStyle()
    }
  }

  injectPointStyle() {
    this.styleTag.innerHTML = `
      ${Object.values(this.props.points).join(', ')} {
        z-index: 1000000001;
        position: relative;
      }
    `
  }

  getfocalPoints() {
    const { padding = 8, points = {} } = this.props

    return Object.entries(points)
      .map(([id, selector]) => {
        const el = window.document.querySelector(selector)
        if (el) {
          const { top, right, bottom, left } = el.getBoundingClientRect()
          return {
            id,
            x: left - padding,
            y: top - padding,
            w: right - left + 2 * padding,
            h: bottom - top + 2 * padding,
          }
        }

        return null
      })
      .filter(d => d)
  }

  render() {
    const { borderRadius = 4, onMaskClicked } = this.props
    const focalPoints = this.getfocalPoints()

    return (
      <div
        className={styles.mask}
        style={
          focalPoints.length
            ? {
                opacity: 1,
                pointerEvents: 'auto',
              }
            : {
                opacity: 0,
                pointerEvents: 'none',
              }
        }
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="focalPointMask">
              <rect width="100%" height="100%" fill="white" />
              {focalPoints.map(({ id, w, h, x, y }) => (
                <rect
                  id={id}
                  key={id}
                  width={w}
                  height={h}
                  x={x}
                  y={y}
                  fill="black"
                  rx={borderRadius}
                  ry={borderRadius}
                />
              ))}
            </mask>
          </defs>

          <rect
            onClick={onMaskClicked ? onMaskClicked : () => null}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.7)"
            mask="url(#focalPointMask)"
          />
        </svg>
      </div>
    )
  }
}
