'use client'

import { useMemo, useState, type CSSProperties } from 'react'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

interface SliderProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}

function Slider({ id, label, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="calc__row">
      <div className="calc__row-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--p': `${pct}%` } as CSSProperties}
      />
    </div>
  )
}

export default function RoiCalculator() {
  const [hours, setHours] = useState(15)
  const [rate, setRate] = useState(65)
  const [coverage, setCoverage] = useState(70)
  const [investment, setInvestment] = useState(1500)

  const { annualCost, savings, paybackWeeks, multiple, hoursSaved } = useMemo(() => {
    const annual = hours * rate * 52
    const saved = annual * (coverage / 100)
    const payback = saved > 0 ? investment / (saved / 52) : Infinity
    return {
      annualCost: annual,
      savings: saved,
      paybackWeeks: payback,
      multiple: investment > 0 ? saved / investment : 0,
      hoursSaved: hours * 52 * (coverage / 100),
    }
  }, [hours, rate, coverage, investment])

  const paybackLabel = Number.isFinite(paybackWeeks)
    ? paybackWeeks < 1
      ? 'Under 1 week'
      : `${paybackWeeks.toFixed(1)} weeks`
    : '—'

  return (
    <div className="calc" aria-label="Automation return on investment calculator">
      <div className="calc__result">
        <div className="calc__result-top">
          <span className="calc__eyebrow">Projected annual savings</span>
          <span className="calc__badge">{multiple.toFixed(1)}× return</span>
        </div>
        <p className="calc__value">{currency.format(savings)}</p>
        <p className="calc__caption">
          against a {currency.format(investment)} build · {Math.round(hoursSaved).toLocaleString()} hours
          reclaimed per year
        </p>

        <div className="calc__stats">
          <div>
            <span>Manual cost / year</span>
            <strong>{currency.format(annualCost)}</strong>
          </div>
          <div>
            <span>Payback period</span>
            <strong>{paybackLabel}</strong>
          </div>
          <div>
            <span>Return on build</span>
            <strong>{multiple.toFixed(1)}×</strong>
          </div>
        </div>
      </div>

      <div className="calc__controls">
        <div className="calc__controls-head">
          <span className="mono-label">Your inputs</span>
          <span className="calc__hint">Drag to match your business</span>
        </div>

        <Slider
          id="roi-hours"
          label="Repetitive hours per week"
          value={hours}
          min={1}
          max={60}
          step={1}
          display={`${hours} hrs`}
          onChange={setHours}
        />
        <Slider
          id="roi-rate"
          label="Loaded cost per hour"
          value={rate}
          min={20}
          max={200}
          step={5}
          display={currency.format(rate)}
          onChange={setRate}
        />
        <Slider
          id="roi-coverage"
          label="Share that can be automated"
          value={coverage}
          min={20}
          max={95}
          step={5}
          display={`${coverage}%`}
          onChange={setCoverage}
        />
        <Slider
          id="roi-investment"
          label="One-time build investment"
          value={investment}
          min={500}
          max={50000}
          step={500}
          display={currency.format(investment)}
          onChange={setInvestment}
        />

        <p className="calc__note">
          Conservative default: 70% of the manual work is automatable. The audit replaces
          these estimates with your real numbers.
        </p>
      </div>
    </div>
  )
}
