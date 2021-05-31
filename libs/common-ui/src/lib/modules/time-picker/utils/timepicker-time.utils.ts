import { ClockFaceTime } from '../models/clock-face-time.interface'

export const getHours = (format: number): ClockFaceTime[] =>
  Array(format)
    .fill(1)
    .map((v: number, i: number) => {
      const angleStep = 30
      const time = v + i
      const angle = angleStep * time
      return { time: time === 24 ? 0 : time, angle }
    })

export function getMinutes(gap = 1): ClockFaceTime[] {
  const minutesCount = 60
  const angleStep = 360 / minutesCount
  const minutes: ClockFaceTime[] = []

  for (let i = 0; i < minutesCount; i++) {
    const angle = angleStep * i
    if (i % gap === 0) {
      minutes.push({ time: i, angle: angle !== 0 ? angle : 360 })
    }
  }
  return minutes
}
