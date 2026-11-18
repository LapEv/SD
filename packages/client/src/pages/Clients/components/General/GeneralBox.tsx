import {
  MapClientGeneralInfoInputFields,
  MapClientGeneralWebInputFields,
} from 'pages/Clients/data'
import { useForm, useFieldArray, useFormState } from 'react-hook-form'
import { ButtonsSection } from 'components/Buttons'
import { memo, useEffect, useState } from 'react'
import { deepEqual } from 'utils/deepEqual'
import { useClients } from 'hooks/clients/useClients'
import { BoxModal } from 'components/MUI'
import { ClientsAddValuesProps, IGeneralBox } from 'pages/Clients/interfaces'
import { GeneralInfo } from './GeneralInfo'
import { GeneralWeb } from './GeneralWeb'
import { GeneralContactsBox } from './GeneralContactsBox'
import { useApp } from 'hooks/app/useApp'
import { Clients } from 'store/slices/clients/interfaces'
import { useSystem } from 'hooks/system/useSystem'
import { ClientAvatar } from './ClientAvatar'
import { FilesData } from 'store/slices/files/interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { passwordClientActive } from 'utils/validatorRules'

export const GeneralBox = memo(({ clientData }: IGeneralBox) => {
  const [{ btnDisabled }, { setbtnDisabled }] = useApp()
  const [
    { newDataInputs, clients, checkError, avatarClient },
    {
      changeClient,
      changeContact,
      setNewDataInputs,
      clearError,
      changeClientAvatar,
      setClientAvatar,
      deleteClientAvatar,
    },
  ] = useClients()
  const [{ generatedPassword }] = useSystem()
  const [, { getClientAvatar }] = useFiles()

  const [clearContacts, setClearContacts] = useState(false)
  const [openContactsBox, setOpenContactsBox] = useState<boolean>(false)

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { Contacts, ..._clientData } = clientData
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const {
    handleSubmit,
    control: controlInfo,
    control: controlWeb,
    setValue: setValueWeb,
    setError: setErrorWeb,
    clearErrors: clearErrorsWeb,
    reset,
  } = useForm<ClientsAddValuesProps>({
    mode: 'onBlur',
    defaultValues: {
      listInfo: MapClientGeneralInfoInputFields.map(data => ({
        ...data,
        value: _clientData[data.name as keyof typeof _clientData],
      })),
      listWeb: MapClientGeneralWebInputFields.map(data => ({
        ...data,
        value: _clientData[data.name as keyof typeof _clientData],
      })),
    },
  })
  const { errors: errorsInfo } = useFormState({ control: controlInfo })
  const { errors: errorsWeb } = useFormState({ control: controlWeb })
  const { fields: fieldsInfo } = useFieldArray({
    control: controlInfo,
    name: 'listInfo',
  })
  const { fields: fieldsWeb } = useFieldArray({
    control: controlWeb,
    name: 'listWeb',
  })

  const changeData = ({ listInfo, listWeb }: ClientsAddValuesProps) => {
    const checkAllErrors = checkError.find(({ statusError }) => statusError)
      ? true
      : false
    if (checkAllErrors) return
    if (listWeb[0].value === '' && listWeb[1].value !== '') {
      setErrorWeb(`listWeb.0.value`, {
        type: 'required',
        message: 'Необходимо ввести логин',
      })
      return
    }
    if (listWeb[0].value !== '' && listWeb[1].value === '') {
      setErrorWeb(`listWeb.1.value`, {
        type: 'required',
        message: 'Необходимо ввести пароль',
      })
      return
    }
    if (newDataInputs.Contacts && newDataInputs.Contacts.length > 0) {
      const toChangeContacts = newDataInputs?.Contacts.map((item, index) => {
        return !deepEqual(
          item as Record<never, never>,
          clientData.Contacts![index] as Record<never, never>,
        )
          ? item
          : null
      }).filter(item => item !== null)
      if (toChangeContacts && toChangeContacts.length > 0) {
        changeContact(toChangeContacts)
      }
    }

    changeClient({
      ...clientData,
      client: listInfo[0].value,
      legalName: listInfo[1].value,
      office: listInfo[2].value,
      officePhone: listInfo[3].value,
      login: listWeb[0].value,
      password:
        listWeb[1].value === passwordClientActive ? '' : listWeb[1].value,
    })
    clearError()
    setbtnDisabled(true)
    setOpenContactsBox(false)
    setValueWeb(`listWeb.1.value`, passwordClientActive as string)
  }

  const checkForChange = (newData: Record<never, never>) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { Contacts, ..._newData } = newData as Clients
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const newClient = { ...newDataInputs, ..._newData }
    const _newClient = {
      ...newClient,
      Contacts: newDataInputs.Contacts ?? clientData.Contacts,
    }
    setNewDataInputs(_newClient)
    setbtnDisabled(deepEqual(_newClient, clientData as Record<never, never>))
  }

  const clearChange = () => {
    setbtnDisabled(true)
    setClearContacts(true)
    reset({
      listInfo: MapClientGeneralInfoInputFields.map(data => ({
        ...data,
        value: _clientData[data.name as keyof typeof _clientData],
      })),
      listWeb: MapClientGeneralWebInputFields.map(data => ({
        ...data,
        value: _clientData[data.name as keyof typeof _clientData],
      })),
    })
  }

  useEffect(() => {
    if (!generatedPassword) return
    setValueWeb(`listWeb.1.value`, generatedPassword as string)
    checkForChange({
      ...clientData,
      ...{
        password: generatedPassword,
      },
    })
    clearErrorsWeb()
  }, [generatedPassword])

  useEffect(() => {
    const currentClient = clients.find(item => item.id === clientData.id)
    if (currentClient) {
      const file = currentClient.Files as FilesData[]
      if (!file || !file.length) return
      const pathfile = file[0].path
      getClientAvatar(pathfile)
    }
  }, [])

  return (
    <BoxModal
      component="form"
      onSubmit={handleSubmit(changeData)}
      className="generalClientInfoBox">
      <ClientAvatar
        id={clientData.id as string}
        changeAvatar={changeClientAvatar}
        deleteAvatar={deleteClientAvatar}
        setAvatar={setClientAvatar}
        avatar={
          avatarClient && avatarClient.length ? JSON.parse(avatarClient) : ''
        }
      />
      <GeneralInfo
        clientData={clientData}
        fieldsInfo={fieldsInfo}
        errors={errorsInfo}
        control={controlInfo}
        checkForChange={checkForChange}
      />
      <GeneralWeb
        clientData={clientData}
        fieldsWeb={fieldsWeb}
        errors={errorsWeb}
        control={controlWeb}
        checkForChange={checkForChange}
      />
      <GeneralContactsBox
        clientData={clientData}
        clearContacts={clearContacts}
        setClearContacts={setClearContacts}
        setOpenContactsBox={() => setOpenContactsBox(!openContactsBox)}
        openContactsBox={openContactsBox}
      />
      <ButtonsSection
        btnSecondHandle={clearChange}
        btnName="Сохранить"
        btnDisabled={btnDisabled}
        btnSecondDisabled={btnDisabled}
        btnSecondName="Отменить изменения"
        className="contactListBoxButtons"
        sx={{ mt: 3, mb: 0 }}
      />
    </BoxModal>
  )
})
