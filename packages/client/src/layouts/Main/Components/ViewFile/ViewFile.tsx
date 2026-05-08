import { IconButton } from '@mui/material'
import { MuiDiv, MuiSpan } from 'components/MUI'
import { LeftArrow, RightArrow } from 'components/SVGIcons'
import { useFiles } from 'hooks/files/useFiles'
import { useEffect, useState } from 'react'
import { FilesData } from 'store/slices/files/interfaces'
import { ViewImage } from './ViewImage'
import CircularProgress from '@mui/material/CircularProgress'
import { ViewButtons } from './ViewButtons'
import { convertFileSize } from 'utils/convertFileSize'

export const ViewFile = () => {
  const [{ viewFiles, isLoadingFiles }, { getViewFile }] = useFiles()
  const [index, setIndex] = useState(0)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === 'ArrowRight' &&
      index < (viewFiles.files?.length as number) - 1
    ) {
      setIndex(index + 1)
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      setIndex(index - 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    viewFiles.files?.map(({ src, path, id }) => {
      if (!src) {
        getViewFile({ pathfile: path, id })
      }
    })
  }, [])

  return (
    <MuiDiv className="viewActContainer">
      <IconButton
        className="arrowIconButton"
        onClick={() => setIndex(index - 1)}
        disabled={index === 0}>
        {index > 0 && <LeftArrow />}
      </IconButton>
      <MuiDiv className="viewActBox">
        {!isLoadingFiles ? (
          <ViewImage file={(viewFiles.files as FilesData[])[index]} />
        ) : (
          <CircularProgress />
        )}
      </MuiDiv>
      <IconButton
        className="arrowIconButton"
        onClick={() => setIndex(index + 1)}
        disabled={index === (viewFiles.files?.length as number) - 1}>
        {index < (viewFiles.files?.length as number) - 1 && <RightArrow />}
      </IconButton>
      <MuiSpan className="viewSpanPanel">{`${index + 1} / ${viewFiles.files?.length}`}</MuiSpan>
      <ViewButtons index={index} />
      <MuiSpan className="viewInfoPanel">{`${(viewFiles.files as FilesData[])[index].name} Размер: ${convertFileSize(Number((viewFiles.files as FilesData[])[index].size))}`}</MuiSpan>
    </MuiDiv>
  )
}
