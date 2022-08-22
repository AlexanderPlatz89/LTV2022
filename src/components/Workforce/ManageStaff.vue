<template>
    <Dialog v-model:visible="showActualTurnsDialog" :style="{ width: '80vw' }">
        <div class="grid col-12">
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>T4</h5>
                    </template>
                    <div class="grid col-12">
                        <div class="col-4">
                            <h5>Mattino</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 1, 1) }}</li>
                                <li v-if="findWorkerByMachineRoleAndTurn('T4', 2, 1) !== ''">
                                    {{ findWorkerByMachineRoleAndTurn('T4', 2, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 3, 1) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Pomeriggio</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 1, 2) }}</li>
                                <li v-if="findWorkerByMachineRoleAndTurn('T4', 2, 2) !== ''">
                                    {{ findWorkerByMachineRoleAndTurn('T4', 2, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 3, 2) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Notte</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 1, 3) }}</li>
                                <li v-if="findWorkerByMachineRoleAndTurn('T4', 2, 3) !== ''">
                                    {{ findWorkerByMachineRoleAndTurn('T4', 2, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T4', 3, 3) }}</li>
                            </ul>
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>T5</h5>
                    </template>
                    <div class="grid col-12">
                        <div class="col-4">
                            <h5>Mattino</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 1, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 2, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 3, 1) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Pomeriggio</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 1, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 2, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 3, 2) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Notte</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 1, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 2, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T5', 3, 3) }}</li>
                            </ul>
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>T6</h5>
                    </template>
                    <div class="grid col-12">
                        <div class="col-4">
                            <h5>Mattino</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 1, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 2, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 3, 1) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Pomeriggio</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 1, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 2, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 3, 2) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Notte</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 1, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 2, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T6', 3, 3) }}</li>
                            </ul>
                        </div>
                    </div>
                </Fieldset>
            </div>
               <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>T7</h5>
                    </template>
                    <div class="grid col-12">
                        <div class="col-4">
                            <h5>Mattino</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 1, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 2, 1) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 3, 1) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Pomeriggio</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 1, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 2, 2) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 3, 2) }}</li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <h5>Notte</h5>
                            <ul>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 1, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 2, 3) }}</li>
                                <li>{{ findWorkerByMachineRoleAndTurn('T7', 3, 3) }}</li>
                            </ul>
                        </div>
                    </div>
                </Fieldset>
            </div>
              <div class="col-6">
                <Fieldset>
                    <template #legend>
                          <h5>{{$t('roles.4')}}</h5>
                    </template>
                    <div class="grid col-12">
                           <div class="col-4">
                            <ul>
                                <li v-for="worker in findSickWorkers()" :key="worker">{{ worker.surname }}</li>
                                </ul>
                           </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>{{$t('roles.5')}}</h5>
                    </template>
                    <div class="grid col-12">
                           <div class="col-4">
                            <ul>
                                <li v-for="worker in findworkersOnvacation()" :key="worker">{{ worker.surname }}</li>
                                </ul>
                           </div>
                    </div>
                </Fieldset>
            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="showWorkerDialog" :style="{ width: '50vw' }">
        <div class="grid">
            <div class="col-6">
                <h5 class="label-add-worker">{{ $t('manageStaff.department') }}:</h5>
            </div>
            <div class="col-6 container-input-add-worker">
                <Dropdown v-model="newWorker.department" style="width: 100%" optionLabel="description"
                    optionValue="code" :options="departments" :placeholder="$t('manageStaff.selectDepartment')" />
            </div>
        </div>
        <div class="grid col-12">
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageStaff.workerData') }}</h5>
                    </template>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.name') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="text"
                                v-model="newWorker.name" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.surname') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="text"
                                v-model="newWorker.surname" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.age') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="number"
                                v-model="newWorker.age" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageStaff.positionCompany') }}</h5>
                    </template>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.workerRole') }}:</h5>
                        </div>
                        <div class="col-6 container-input-add-worker">
                            <Dropdown :disabled="newWorker.department == null" v-model="newWorker.workerRole"
                                style="width: 10em" optionLabel="description" optionValue="code" :options="workerRoles"
                                :placeholder="$t('manageStaff.workerRole')" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.turn') }}:</h5>
                        </div>
                        <div class="col-6 container-input-add-worker">
                            <Dropdown :disabled="newWorker.department == null" v-model="newWorker.turn"
                                style="width: 10em" optionLabel="description" optionValue="code" :options="turns"
                                :placeholder="$t('manageStaff.turn')" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.machine') }}:</h5>
                        </div>
                        <div class="col-6 container-input-add-worker">
                            <Dropdown :disabled="newWorker.department == null" v-model="newWorker.machine"
                                style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                        </div>
                    </div>
                </Fieldset>
            </div>
        </div>
        <Button style="float: right" :label="$t('manageStaff.newWorker')" icon="pi pi-plus" iconPos="right"
            @click="addWorker()" />
    </Dialog>
    <Dialog v-model:visible="showTurnDialog" :style="{ width: '50vw' }">
        <div class="grid col-12">
            <div class="col-12">
                <Fieldset>
                    <template #legend>
                        <h5>T4</h5>
                    </template>
                    <div class="grid">
                        <div class="col-4 container-input-add-worker">
                            <h5>Mattina</h5>
                            <Dropdown v-model="machineLeaderT4_1" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(1, 'T4', machineLeaderT4_1)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT4_1" style="width: 10em" :options="workers"
                                @change="setHelper(1, 'T4', helperT4_1)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT4_1" style="width: 10em" :options="workers"
                                @change="setStakerist(1, 'T4', stakeristT4_1)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Pomeriggio</h5>
                            <Dropdown v-model="machineLeaderT4_2" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(2, 'T4', machineLeaderT4_2)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT4_2" style="width: 10em" :options="workers"
                                @change="setHelper(2, 'T4', helperT4_2)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT4_2" style="width: 10em" :options="workers"
                                @change="setStakerist(2, 'T4', stakeristT4_2)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Notte</h5>
                            <Dropdown v-model="machineLeaderT4_3" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(3, 'T4', machineLeaderT4_3)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT4_3" style="width: 10em" :options="workers"
                                @change="setHelper(3, 'T4', helperT4_3)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT4_3" style="width: 10em" :options="workers"
                                @change="setStakerist(3, 'T4', stakeristT4_3)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-12">
                <Fieldset>
                    <template #legend>
                        <h5>T5</h5>
                    </template>
                    <div class="grid">
                        <div class="col-4 container-input-add-worker">
                            <h5>Mattina</h5>
                            <Dropdown v-model="machineLeaderT5_1" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(1, 'T5', machineLeaderT5_1)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT5_1" style="width: 10em" :options="workers"
                                @change="setHelper(1, 'T5', helperT5_1)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT5_1" style="width: 10em" :options="workers"
                                @change="setStakerist(1, 'T5', stakeristT5_1)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Pomeriggio</h5>
                            <Dropdown v-model="machineLeaderT5_2" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(2, 'T5', machineLeaderT5_2)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT5_2" style="width: 10em" :options="workers"
                                @change="setHelper(2, 'T5', helperT5_2)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT5_2" style="width: 10em" :options="workers"
                                @change="setStakerist(2, 'T5', stakeristT5_2)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Notte</h5>
                            <Dropdown v-model="machineLeaderT5_3" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(3, 'T5', machineLeaderT5_3)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT5_3" style="width: 10em" :options="workers"
                                @change="setHelper(3, 'T5', helperT5_3)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT5_3" style="width: 10em" :options="workers"
                                @change="setStakerist(3, 'T5', stakeristT5_3)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-12">
                <Fieldset>
                    <template #legend>
                        <h5>T6</h5>
                    </template>
                    <div class="grid">
                        <div class="col-4 container-input-add-worker">
                            <h5>Mattina</h5>
                             <Dropdown v-model="machineLeaderT6_1" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(1, 'T6', machineLeaderT6_1)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT6_1" style="width: 10em" :options="workers"
                                @change="setHelper(1, 'T6', helperT6_1)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT6_1" style="width: 10em" :options="workers"
                                @change="setStakerist(1, 'T6', stakeristT6_1)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Pomeriggio</h5>
                            <Dropdown v-model="machineLeaderT6_2" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(2, 'T6', machineLeaderT6_2)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT6_2" style="width: 10em" :options="workers"
                                @change="setHelper(2, 'T6', helperT6_2)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT6_2" style="width: 10em" :options="workers"
                                @change="setStakerist(2, 'T6', stakeristT6_2)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Notte</h5>
                            <Dropdown v-model="machineLeaderT6_3" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(3, 'T6', machineLeaderT6_3)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT6_3" style="width: 10em" :options="workers"
                                @change="setHelper(3, 'T6', helperT6_3)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT6_3" style="width: 10em" :options="workers"
                                @change="setStakerist(3, 'T6', stakeristT6_3)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-12">
                <Fieldset>
                    <template #legend>
                        <h5>T7</h5>
                    </template>
                    <div class="grid">
                        <div class="col-4 container-input-add-worker">
                            <h5>Mattina</h5>
                            <Dropdown v-model="machineLeaderT7_1" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(1, 'T7', machineLeaderT7_1)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT7_1" style="width: 10em" :options="workers"
                                @change="setHelper(1, 'T7', helperT7_1)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT7_1" style="width: 10em" :options="workers"
                                @change="setStakerist(1, 'T7', stakeristT7_1)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Pomeriggio</h5>
                            <Dropdown v-model="machineLeaderT7_2" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(2, 'T7', machineLeaderT7_2)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT7_2" style="width: 10em" :options="workers"
                                @change="setHelper(2, 'T7', helperT7_2)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT7_2" style="width: 10em" :options="workers"
                                @change="setStakerist(2, 'T7', stakeristT7_2)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                        <div class="col-4 container-input-add-worker">
                            <h5>Notte</h5>
                            <Dropdown v-model="machineLeaderT7_3" style="width: 10em" :options="workers"
                                @change="setLeaderMachine(3, 'T7', machineLeaderT7_3)"
                                :placeholder="$t('manageStaff.machineLeader')" optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="helperT7_3" style="width: 10em" :options="workers"
                                @change="setHelper(3, 'T7', helperT7_3)" :placeholder="$t('manageStaff.helper')"
                                optionLabel="surname" optionValue="id" />
                            <Dropdown v-model="stakeristT7_3" style="width: 10em" :options="workers"
                                @change="setStakerist(3, 'T7', stakeristT7_3)"
                                :placeholder="$t('manageStaff.stakerist')" optionLabel="surname" optionValue="id" />
                        </div>
                    </div>
                </Fieldset>
            </div>
        </div>
    </Dialog>
    <div class="layout-dashboard">
        <Button style="float: right" :label="$t('manageStaff.nextTurns')" icon="pi pi-plus" iconPos="right"
            @click="openTurnDialog()" />
        <Button style="float: right" :label="$t('manageStaff.actualTurns')" icon="pi pi-plus" iconPos="right"
            @click="openActualTurnsDialog()" />
        <div class="col-12" style="height: 4em"><Button style="float: right" :label="$t('manageStaff.addWorker')"
                icon="pi pi-plus" iconPos="right" @click="openWorkerDialog()" /></div>

        <div class="col-12">
            <DataTable :value="workers" responsiveLayout="scroll" filterDisplay="row" v-model:filters="filters">
                <Column field="name" :header="$t('manageStaff.name')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.name }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.name" />
                        </div>
                    </template>
                </Column>
                <Column field="surname" :header="$t('manageStaff.surname')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.surname }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.surname" />
                        </div>
                    </template>
                </Column>
                <Column field="age" :header="$t('manageStaff.age')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.age }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.age" />
                        </div>
                    </template>
                </Column>
                <Column field="workerRole" :header="$t('manageStaff.workerRole')" :showFilterMenu="false"
                    :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
                            :options="workerRoles" optionLabel="description" optionValue="code"
                            :placeholder="$t('manageStaff.workerRole')" style="min-width: 10em" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ $t('roles.'+worker.data.workerRole) }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.workerRole" :options="workerRoles" optionLabel="description"
                                optionValue="code" style="min-width: 12.5em" />
                        </div>
                    </template>
                </Column>
                <Column field="department" :header="$t('manageStaff.department')" :showFilterMenu="false"
                    :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
                            :options="departments" optionLabel="description" optionValue="code"
                            :placeholder="$t('manageStaff.department')" style="min-width: 10em" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ decodeDepartments(worker.data.department) }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.department" :options="departments" optionLabel="description"
                                optionValue="code" style="min-width: 10em" />
                        </div>
                    </template>
                </Column>
                <Column field="machine" :header="$t('manageStaff.machine')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
                            :options="machines" :placeholder="$t('manageStaff.machine')" style="min-width: 5em" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.machine }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.machine" :options="machines" style="min-width: 5em" />
                        </div>
                    </template>
                </Column>
                <Column field="turn" :header="$t('manageStaff.turn')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
                            :options="turns" optionLabel="description" optionValue="code"
                            :placeholder="$t('manageStaff.turn')" style="min-width: 5em" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ $t('turn.' + worker.data.turn) }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.turn" class="p-column-filter" :options="turns"
                                optionLabel="description" optionValue="code" :placeholder="$t('manageStaff.turn')"
                                style="min-width: 5em" />
                        </div>
                    </template>
                </Column>
                <Column>
                    <template #body="worker">
                        <div v-if="!editing">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-info"
                                @click="startEditingWorker(worker.data)" />
                        </div>
                        <div v-if="editing">
                            <Button icon="pi pi-check" class="p-button-rounded p-button-info"
                                @click="editWorker(worker.data)" />
                            <Button icon="pi pi-times" class="p-button-rounded p-button-info"
                                style="margin-left: 0.5em; margin-right: 0.5em" @click="cancelWorkerEditing()" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                @click="deleteWorker(worker.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    components: {},
    data() {
        return {
            machineLeaderT4_1: null,
            machineLeaderT4_2: null,
            machineLeaderT4_3: null,
            machineLeaderT5_1: null,
            machineLeaderT5_2: null,
            machineLeaderT5_3: null,
            machineLeaderT6_1: null,
            machineLeaderT6_2: null,
            machineLeaderT6_3: null,
            machineLeaderT7_1: null,
            machineLeaderT7_2: null,
            machineLeaderT7_3: null,
            helperT4_1: null,
            helperT4_2: null,
            helperT4_3: null,
            helperT5_1: null,
            helperT5_2: null,
            helperT5_3: null,
            helperT6_1: null,
            helperT6_2: null,
            helperT6_3: null,
            helperT7_1: null,
            helperT7_2: null,
            helperT7_3: null,
            stakeristT4_1: null,
            stakeristT4_2: null,
            stakeristT4_3: null,
            stakeristT5_1: null,
            stakeristT5_2: null,
            stakeristT5_3: null,
            stakeristT6_1: null,
            stakeristT6_2: null,
            stakeristT6_3: null,
            stakeristT7_1: null,
            stakeristT7_2: null,
            stakeristT7_3: null,
            showWorkerDialog: false,
            showTurnDialog: false,
            showActualTurnsDialog: false,
            operatorSelected: null,
            newWorker: {},
            workersRestore: [],
            turns: [
                { description: this.$t('turn.1'), code: 1 },
                { description: this.$t('turn.2'), code: 2 },
                { description: this.$t('turn.3'), code: 3 },
            ],
            departments: [
                { description: this.$t('departments.rotary'), code: 1 },
                { description: this.$t('departments.flatStamp'), code: 2 },
                { description: this.$t('departments.legatory'), code: 3 },
            ],
            machines: ['T4', 'T5', 'T6', 'T7'],
            workerRoles: [
                { description: this.$t('roles.1'), code: '1' },
                { description: this.$t('roles.2'), code: '2' },
                { description: this.$t('roles.3'), code: '3' },
                { description: this.$t('roles.4'), code: '4' },
                { description: this.$t('roles.5'), code: '5' }
            ],
            filters: {
                name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                surname: { value: null, matchMode: FilterMatchMode.CONTAINS },
                age: { value: null, matchMode: FilterMatchMode.CONTAINS },
                workerRole: { value: null, matchMode: FilterMatchMode.EQUALS },
                department: { value: null, matchMode: FilterMatchMode.EQUALS },
                machine: { value: null, matchMode: FilterMatchMode.EQUALS },
                turn: { value: null, matchMode: FilterMatchMode.EQUALS },
            },
        };
    },
    computed: {
        editing() {
            return this.$store.getters['editing'];
        },
        machinesDB() {
            return this.$store.getters['machinesDB'];
        },
        workersDB() {
            return this.$store.getters['workersDB'];
        },
        workers(){
             return this.$store.getters['workers'];
        }
    },
    methods: {
        findSickWorkers(){
            const sickWorkers = this.workers.filter(worker => worker.workerRole == 4)
            return sickWorkers != null ? sickWorkers : []
        },
         findworkersOnvacation(){
            const workersOnvacation = this.workers.filter(worker => worker.workerRole == 5)
            return workersOnvacation != null ? workersOnvacation : []
        },
        findWorkerByMachineRoleAndTurn(machine, role, turn) {
            const worker = this.workers.find(worker => worker.machine === machine && worker.workerRole == role && worker.turn == turn)
            return worker != null ? worker.surname : ''
        },
        setLeaderMachine(turn, machine, variableInData) {
            const workerToEdit = this.workers.find(worker => worker.id === variableInData)
            workerToEdit.workerRole = '1'
            workerToEdit.machine = machine
            workerToEdit.turn = turn
            this.editWorker(workerToEdit)
        },
        setHelper(turn, machine, variableInData) {
            const workerToEdit = this.workers.find(worker => worker.id === variableInData)
            workerToEdit.workerRole = '2'
            workerToEdit.machine = machine
            workerToEdit.turn = turn
            this.editWorker(workerToEdit)
        },
        setStakerist(turn, machine, variableInData) {
            const workerToEdit = this.workers.find(worker => worker.id === variableInData)
            workerToEdit.workerRole = '3'
            workerToEdit.machine = machine
            workerToEdit.turn = turn
            this.editWorker(workerToEdit)
        },
        editWorker(worker) {
            let table = this.$t('tables.workers' + worker.department);
            this.$db.insert(this.workersDB, table, {
                ...worker,
                name: worker.name.trim(),
                surname: worker.surname.trim(),
                age: worker.age.trim(),
                workerRole: worker.workerRole.trim(),
                department: worker.department,
                machine: worker.machine.trim(),
                turn: worker.turn
            });
            this.stopEditing();
        },
        deleteWorker(worker) {
            let table = this.$t('tables.workers' + worker.department);
            this.workers = this.workers.filter((workerList) => workerList.id !== worker.id);
            this.$db.delete(this.workersDB, table, worker.id);
        },
        startEditingWorker() {
            this.workersRestore = this.$filters.deepClone(this.workers);
            this.startEditing();
        },
        cancelWorkerEditing() {
            this.workers = this.$filters.deepClone(this.workersRestore);
            this.workersRestore = [];
            this.stopEditing();
        },
        startEditing() {
            this.$store.commit('setEditing', true);
        },
        stopEditing() {
            this.$store.commit('setEditing', false);
        },
        decodeDepartments(code) {
            if (code === 1) {
                return this.$t('departments.rotary');
            } else if (code === 2) {
                return this.$t('departments.flatStamp');
            } else if (code === 3) {
                return this.$t('departments.legatory');
            } else {
                return 'N.D';
            }
        },
        addWorker() {
            const workerItem = {
                id: (Math.random() * 10000).toFixed(0),
                name: this.newWorker.name && this.newWorker.name.trim(),
                surname: this.newWorker.surname && this.newWorker.surname.trim(),
                age: this.newWorker.age && this.newWorker.age.trim(),
                workerRole: this.newWorker.workerRole && this.newWorker.workerRole.trim(),
                department: this.newWorker.department,
                machine: this.newWorker.machine && this.newWorker.machine.trim(),
                turn: this.newWorker.turn
            };
            this.workers.push(workerItem);
            let table = this.$t('tables.workers' + workerItem.department);
            this.$db.insert(this.workersDB, table, workerItem);
            this.newWorker = {};
            this.showWorkerDialog = false;
        },
        openWorkerDialog() {
            this.showWorkerDialog = true;
        },
        openTurnDialog() {
            this.showTurnDialog = true;
        },
        openActualTurnsDialog() {
            this.showActualTurnsDialog = true;
        },
    },
};
</script>

<style scoped lang="scss">
.container-input-add-worker {
    padding: 0.5em;
}

.input-add-worker {
    width: 10em !important;
}

.label-add-worker {
    margin-top: 0.25em;
}

.dataTable {
    position: relative;
    align-content: center;
    justify-content: center;
}
</style>
