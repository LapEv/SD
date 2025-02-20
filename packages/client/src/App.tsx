import { memo, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import './App.css'
import * as Pages from 'pages'
import * as Layouts from 'layouts'
import { Routes as Paths } from 'utils/routes'
import { RequiredAuth } from 'hoks/RequiredAuth'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { checkLoading } from 'utils/checkLoading'
import { useAuth } from 'hooks/auth/useAuth'
import { Message } from 'components/Message'
import { FullScreen } from 'components/FullScreen'

const App = memo(() => {
  const [{ user }, { checkUser }] = useAuth()

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <ErrorBoundary>
      <FullScreen>
        <div className="App" data-testid="App">
          {checkLoading() && (
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1999,
                backgroundColor: 'rgba(0,0,0,0.7)',
                position: 'fixed',
              }}>
              <CircularProgress />
            </Box>
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
