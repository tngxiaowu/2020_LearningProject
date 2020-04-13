<template>
    <Promised :promise="usersPromise">
    <template v-slot:pending>
        <p>Loading...</p>
    </template>
    <template v-slot="data">
        <ul>
        <li v-for="（user,index) in data" :key='index'>{{ user.name }}</li>
        </ul>
    </template>
    <template v-slot:rejected="error">
        <p>Error: {{ error.message }}</p>
    </template>
    </Promised>
</template>
