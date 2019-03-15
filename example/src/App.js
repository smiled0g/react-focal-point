import React, { Component } from 'react'
import FocalPoint from 'react-focal-point'
import { Box, Flex, Heading } from 'rebass'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 4,
    max: 8,
  },
  wordsPerSentence: {
    min: 8,
    max: 16,
  },
})

class Article extends React.Component {
  constructor(props) {
    super(props)

    this.paragraph1 = lorem.generateSentences(4)
    this.paragraph2 = lorem.generateSentences(4)
    this.paragraph3 = lorem.generateSentences(4)
    this.paragraph4 = lorem.generateSentences(4)
    this.paragraph5 = lorem.generateSentences(4)
    this.paragraph6 = lorem.generateSentences(4)
  }

  render() {
    const { focalRunning, startFocal, stopFocal } = this.props

    return (
      <Box p={4} m="0 auto" width="900px">
        <Box mx={3} mb="36px" className="h1">
          <Heading mb={2} fontFamily="serif" fontSize="42px">
            Focal Points
            <button
              onClick={focalRunning ? stopFocal : startFocal}
              style={{
                padding: 8,
                marginLeft: 15,
                borderRadius: 5,
                verticalAlign: 'middle',
              }}
            >
              {focalRunning ? 'Stop' : 'Start'}
            </button>
          </Heading>
        </Box>
        <Box mx={3} className="p1">
          <Heading mb={2}>Paragraph 1</Heading>
          <Box flex={1}>{this.paragraph1}</Box>
        </Box>
        <Flex mt={4} pt={4} style={{ borderTop: 'solid 1px #bababa' }}>
          <Box flex={1} mx={3} className="p2">
            <Heading mb={2}>Paragraph 2</Heading>
            <Box flex={1}>{this.paragraph2}</Box>
          </Box>
          <Box flex={1} mx={3} className="p3">
            <Heading mb={2}>Paragraph 3</Heading>
            <Box flex={1}>{this.paragraph3}</Box>
          </Box>
        </Flex>
        <Flex mt={4} pt={4} style={{ borderTop: 'solid 1px #bababa' }}>
          <Box flex={1} mx={3} className="p4">
            <Heading mb={2}>Paragraph 4</Heading>
            <Box flex={1}>{this.paragraph4}</Box>
          </Box>
          <Box flex={1} mx={3} className="p5">
            <Heading mb={2}>Paragraph 5</Heading>
            <Box flex={1}>{this.paragraph5}</Box>
          </Box>
          <Box flex={1} mx={3} className="p6">
            <Heading mb={2}>Paragraph 6</Heading>
            <Box flex={1}>{this.paragraph6}</Box>
          </Box>
        </Flex>
      </Box>
    )
  }
}

export default class App extends Component {
  state = {
    focalRunning: false,
    points: {},
  }

  startFocal() {
    const selectorPool = ['.h1', '.p1', '.p2', '.p3', '.p4', '.p5', '.p6']
    const getRandomSelector = () =>
      selectorPool[Math.floor(Math.random() * selectorPool.length)]

    this.setState(
      {
        focalRunning: true,
      },
      async () => {
        while (this.state.focalRunning) {
          this.setState({
            points: {
              focalPointA: getRandomSelector(),
              focalPointB: getRandomSelector(),
              focalPointC: getRandomSelector(),
            },
          })

          await new Promise(r => setTimeout(r, 2000))
        }
      },
    )
  }

  stopFocal() {
    this.setState({ focalRunning: false, points: {} })
  }

  render() {
    return (
      <React.Fragment>
        <FocalPoint
          points={this.state.points}
          onMaskClick={this.stopFocal.bind(this)}
        />
        <Article
          focalRunning={this.state.focalRunning}
          startFocal={this.startFocal.bind(this)}
          stopFocal={this.stopFocal.bind(this)}
        />
      </React.Fragment>
    )
  }
}
