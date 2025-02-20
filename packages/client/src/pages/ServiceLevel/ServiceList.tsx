import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { IServiceList, IServiceListDataPage } from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { classifier, classifierComponent } from 'static/styles'
import { SLAList } from '.'
import { useTheme } from '@emotion/react'
import { ITheme } from 'themes/themeConfig'

export const ServiceList = memo(({ name, label }: IServiceList) => {
  const [{ sla, ola, activeList }, { setActiveList, getSLA, getOLA }] = useSLA()
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<IServiceListDataPage[]>([])
  const theme = useTheme() as ITheme

  const handleClick = () => {
    setOpen(!open)
    setActiveList(name as string)
  }

  useEffect(() => {
    setData(
      sla.map(
        ({
          sla,
          id,
          days,
          time,
          timeStart,
          timeEnd,
          id_typeOfWork,
          TypesOfWork,
        }) => {
          return {
            sla,
            days,
            id,
            time,
            timeStart,
            timeEnd,
            id_typeOfWork,
            TypesOfWork,
          }
        },
      ),
    )
  }, [sla])

  useEffect(() => {
    setData(
      ola.map(
        ({
          ola,
          id,
          days,
          time,
          timeStart,
          timeEnd,
          id_typeOfWork,
          TypesOfWork,
        }) => {
          return {
            ola,
            id,
            days,
            time,
            timeStart,
            timeEnd,
            id_typeOfWork,
            TypesOfWork,
          }
        },
      ),
    )
  }, [ola])

  useEffect(() => {
    if (activeList !== name) {
      setOpen(false)
    }
    if (activeList === 'ola') {
      getOLA()
      return
    }
    getSLA()
  }, [activeList])

  return (
    <Box sx={classifier}>
      <ListItemButton
        divider={open}
        sx={{
          ...classifierComponent,
          height: theme.fontSize === 'small' ? 40 : 50,
        }}
        onClick={handleClick}>
        <ListItemText primary={label} />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {data.map(
          ({
            sla,
            ola,
            days,
            time,
            timeStart,
            timeEnd,
            id,
            id_typeOfWork,
            TypesOfWork,
          }) => (
            <SLAList
              sla={sla}
              ola={ola}
              days={days}
              time={time}
              timeStart={timeStart}
              timeEnd={timeEnd}
              id_typeOfWork={id_typeOfWork}
              TypesOfWork={TypesOfWork}
              id={id as string}
              key={`${id}`}
              height={theme.fontSize === 'small' ? 40 : 50}
            />
          ),
        )}
      </Collapse>
    </Box>
  )
})
