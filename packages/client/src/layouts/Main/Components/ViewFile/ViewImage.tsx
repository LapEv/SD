import { Box } from '@mui/material'
import { IViewImage } from 'layouts/Main/interfaces'
import {
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react'
import { emptyImgPosition } from './emptyImgPosition'

export const ViewImage = ({ file }: IViewImage) => {
  const [isPanning, setPanning] = useState(false)
  const [image, setImage] = useState({
    width: 0,
    height: 0,
  })
  const [position, setPosition] = useState(emptyImgPosition)
  const containerRef = useRef<HTMLDivElement>(null)

  const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImage({
      width: (e.target as HTMLImageElement).naturalWidth,
      height: (e.target as HTMLImageElement).naturalHeight,
    })
    setPosition(emptyImgPosition)
  }

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setPanning(true)
    setPosition({
      ...position,
      oldX: e.clientX,
      oldY: e.clientY,
    })
  }

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10
      const scale = 1 - sign
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()

        setPosition({
          ...position,
          x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
          y:
            position.y * scale -
            ((image?.height * rect.width) / image?.width / 2 -
              e.clientY +
              rect.y) *
              sign,
          z: position.z * scale,
        })
      }
    }
  }

  useEffect(() => {
    const mouseup = () => {
      setPanning(false)
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const mousemove = (event: any) => {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      if (isPanning) {
        setPosition({
          ...position,
          x: position.x + event.clientX - position.oldX,
          y: position.y + event.clientY - position.oldY,
          oldX: event.clientX,
          oldY: event.clientY,
        })
      }
    }

    window.addEventListener('mouseup', mouseup)
    window.addEventListener('mousemove', mousemove)

    return () => {
      window.removeEventListener('mouseup', mouseup)
      window.removeEventListener('mousemove', mousemove)
    }
  })

  if (!file.src) {
    return <>Файл отсутствует! Обратитесь к администратору!</>
  }
  if (file.mimetype.includes('image')) {
    return (
      <Box
        component={'div'}
        sx={{ overflow: 'hidden' }}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onWheel={onWheel}>
        <Box
          sx={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
          }}>
          <img
            src={JSON.parse(file.src).data}
            style={{ minWidth: '100%', maxWidth: '100%' }}
            onLoad={onLoad}
          />
        </Box>
      </Box>
    )
  }
  if (file.mimetype.includes('pdf')) {
    return (
      <p>
        Это PDF. Посмотреть его здесь нельзя, только скачать .
        <a
          href={JSON.parse(file.src).data}
          target="_blank"
          download={file.name}>
          Download PDF
        </a>
      </p>
    )
  }
}
