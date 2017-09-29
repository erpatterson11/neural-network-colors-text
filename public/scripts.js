// aka Multi-Layer Perceptron (MLP)


const opt1 = document.querySelector('.opt-1')
const opt2 = document.querySelector('.opt-2')
const text1 = document.querySelector('.option-1-text')
const text2 = document.querySelector('.option-2-text')


function ColorTrainer(perceptronConfig, trainingSize = 100) {

    let trainingData = {}

    const randomInclusive = (min = 0, max = 1) => min + Math.round( Math.random() * (max - min) * 1000 )/1000
    const convertToHsl = ({h,s,l}) => `hsl(${h},${s}%,${l}%)`
    const newDataPoint = () => {
        trainingData = {
            h: Math.round(randomInclusive()*360),
            s: Math.round(randomInclusive()*100),
            l: Math.round(randomInclusive()*100) 
        }
    }
    const setBackGroundColor = (color, ...elems) => elems.forEach( el => el.style.backgroundColor = color )
    const setAnswer = (textColor) => {
        trainingData.black = textColor === '#000000'
        axios.post('http://localhost:3005/api/color', trainingData)
    }

    this.renderTest = function() { 
        newDataPoint()
        setBackGroundColor(convertToHsl(trainingData), opt1, opt2)
    }

    this.handleclick = function(color) {
        setAnswer(color)
    }
}

const trainer = new ColorTrainer()

trainer.renderTest()

opt1.addEventListener("click", () => {
    trainer.handleclick('#ffffff')
    trainer.renderTest()
})

opt2.addEventListener("click", () => {
    trainer.handleclick('#000000')
    trainer.renderTest()
})
