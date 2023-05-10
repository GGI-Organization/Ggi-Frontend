import React, { createContext, useCallback, useMemo, useState } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const STEP = {
  ONE: 'one',
  TWO: 'two',
  THREE: 'three'
}

export const FlowContext = createContext(null)

function Dashboard() {

  const [step, setStep] = useState(STEP.ONE)
  const [data, setData] = useState({ image: {}, tasks: [], mockups: [], pathDiagramBPMN: '', pathMockupGroup: '' })

  const updateData = useCallback((response) => {
    setData(pre => ({ ...pre, ...response }))
  }, []);

  const contextValue = useMemo(() => ({
    data,
    updateData
  }), [data, updateData]);

  return (
    <FlowContext.Provider value={contextValue}>
      {step == STEP.ONE && (
        <StepOne setStep={newStep => setStep(newStep)} />
      )}
      {step == STEP.TWO && (
        <StepTwo setStep={newStep => setStep(newStep)} />
      )}
      {step == STEP.THREE && (
        <StepThree setStep={newStep => setStep(newStep)} />
      )}
    </FlowContext.Provider>
  )
}

export default Dashboard