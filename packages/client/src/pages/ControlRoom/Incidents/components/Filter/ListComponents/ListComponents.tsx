import { memo } from 'react'
import { IListFilterComponents } from './interfaces'
import {
  ListINCStatuses,
  ListClient,
  ListClientLegalName,
  ListContract,
  ListObject,
  ListRegion,
  ListUserAccepted,
  ListSLA,
  ListMethodRequest,
  ListEquipment,
  ListModel,
  ListTypicalMalfunction,
  ListUserExecutor,
  ListUserResponsible,
  ListUserClosingCheck,
  ListTypesOfWork,
  ListTypesCompletedWork,
  ListUserClosing,
} from './index'

export const ListComponents = memo(
  ({ item, filterList, onFilter, disabled }: IListFilterComponents) => {
    if (item.column === 'status') {
      return (
        <ListINCStatuses
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'client') {
      return (
        <ListClient
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'legalName') {
      return (
        <ListClientLegalName
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'contract') {
      return (
        <ListContract
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'object') {
      return (
        <ListObject
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'region') {
      return (
        <ListRegion
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'userAccepted') {
      return (
        <ListUserAccepted
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'sla') {
      return (
        <ListSLA
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'methodsReuqest') {
      return (
        <ListMethodRequest
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'equipment') {
      return (
        <ListEquipment
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'model') {
      return (
        <ListModel
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'typicalMalfunction') {
      return (
        <ListTypicalMalfunction
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'executor') {
      return (
        <ListUserExecutor
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'responsible') {
      return (
        <ListUserResponsible
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'userClosingCheck') {
      return (
        <ListUserClosingCheck
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'typeOfWork') {
      return (
        <ListTypesOfWork
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'typeCompletedWork') {
      return (
        <ListTypesCompletedWork
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    if (item.column === 'userClosing') {
      return (
        <ListUserClosing
          item={item}
          filterList={filterList}
          onFilter={onFilter}
          disabled={disabled}
        />
      )
    }
    return <></>
  },
)
