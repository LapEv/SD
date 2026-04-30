import { memo, MouseEvent, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import './App.css'
import * as Pages from 'pages/index'
import * as Layouts from 'layouts/index'
import { Routes as Paths } from 'utils/routes'
import { RequiredAuth } from 'hoks/RequiredAuth'
import CircularProgress from '@mui/material/CircularProgress'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { checkLoading } from 'utils/checkLoading'
import { useAuth } from 'hooks/auth/useAuth'
import { Message } from 'components/Message'
import { FullScreen } from 'components/FullScreen'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { minHeaderColumnWidth } from 'pages/ControlRoom/Incidents/data'
import { MuiDiv } from 'components/MUI'

const App = memo(() => {
  const [{ user }, { checkUser }] = useAuth()
  const [{ columnX, columnOptions }, { setColumnX, setColumnOptions }] =
    useTableINC()
  const refApp = useRef<HTMLDivElement>(null)

  const mouseUp = () => {
    if (columnX.position > 0 && columnX.id) {
      const newColumnOptions = columnOptions.map(value =>
        columnX.id === value.id
          ? {
              ...value,
              width: columnX.width,
            }
          : value,
      )
      setColumnOptions(newColumnOptions)
      setColumnX({
        position: 0,
        id: '',
        width: 0,
      })
    }
  }

  const mouseOver = (e: MouseEvent<HTMLElement>) => {
    if (columnX.position > 0 && columnX.id) {
      const diffWidth = e.screenX - columnX.position

      if (columnX.width + diffWidth < minHeaderColumnWidth) {
        const diffMinScreenX = columnX.width - minHeaderColumnWidth
        setColumnX({
          position: columnX.position - diffMinScreenX,
          id: columnX.id,
          width: minHeaderColumnWidth,
        })
        return
      }

      setColumnX({
        position: e.screenX,
        id: columnX.id,
        width: columnX.width + diffWidth,
      })
    }
    e.preventDefault()
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <ErrorBoundary>
      <FullScreen>
        <div
          className="App"
          data-testid="App"
          ref={refApp}
          onMouseUp={mouseUp}
          onMouseMove={mouseOver}>
          {checkLoading() && (
            <MuiDiv className={'appLoading'}>
              <CircularProgress />
            </MuiDiv>
          )}
          <Message />
          <Routes>
            <Route path={Paths.Index} element={<Layouts.Main />}>
              <Route
                index
                element={
                  !isEmptyObjField(user) ? <Pages.Home /> : <Pages.Login />
                }
              />
              <Route path={Paths.Login} element={<Pages.Login />} />
              <Route
                path={Paths.Profile}
                element={
                  <RequiredAuth>
                    <Pages.Profile />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.Incidents}
                element={
                  <RequiredAuth>
                    <Pages.Incidents />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.IncidentsConfirm}
                element={
                  <RequiredAuth>
                    <Pages.IncidentsConfirm />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.EngineerRoom}
                element={
                  <RequiredAuth>
                    <Pages.EngineerPage />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.Warehouse}
                element={
                  <RequiredAuth>
                    <Pages.Warehouse />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.Classifier}
                element={
                  <RequiredAuth>
                    <Pages.Classifier />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.Users}
                element={
                  <RequiredAuth>
                    <Pages.Users />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.Clients}
                element={
                  <RequiredAuth>
                    <Pages.Clients />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.ServiceLevel}
                element={
                  <RequiredAuth>
                    <Pages.ServiceLevel />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.AddClientIncident}
                element={
                  <RequiredAuth>
                    <Pages.AddClientIncident />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.CheckIncident}
                element={
                  <RequiredAuth>
                    <Pages.ClientIncidentStatus />
                  </RequiredAuth>
                }
              />
              <Route
                path={Paths.toTechSupport}
                element={
                  <RequiredAuth>
                    <Pages.ClientTechSupport />
                  </RequiredAuth>
                }
              />
            </Route>
            <Route path={Paths.NotFounde} element={<Pages.Error />} />
          </Routes>
        </div>
      </FullScreen>
    </ErrorBoundary>
  )
})

export default App
