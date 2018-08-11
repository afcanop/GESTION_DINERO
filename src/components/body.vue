<template>
    <section class="container">
        <div class="columns">
            <div class="colum">
                <div class="card">
                    <div class="card-content">
                        <h1>presupuesto</h1>
                        <form>
                            <div class="field">
                                <label class="label">Nombre Ingreso</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="presupuesto" v-on:change="Changepresupuesto" class="input" type="number" placeholder="Text input" id="motivo" name="motivo"  autocomplete="off"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <h1>INGRESO Gastos</h1>
                        <form>
                            <div class="field">
                                <label class="label">Nombre Ingreso</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="NombreIngreso" class="input" type="text" placeholder="nombre del ingreso" id="motivo" name="motivo"  autocomplete="off"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Valor del ingreso</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="ValorIngreso" class="input" type="number" placeholder="por favor ingresar valor" id="valor" name="valor"  autocomplete="off"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Tipo del ingreso</label>
                                <div class="control">
                                    <div class="select ">
                                        <select v-model="TipoIngreso" name="tipo" id="tipo" >
                                            <option value="DEUDA" selected>DEUDA</option>
                                            <option value="AHORRO" >AHORRO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button class="button is-large is-fullwidth is-success" @click="saveData">Guardar</button >
                        </form>
                    </div>
                </div>
            </div>
            <div class="column">
                <div id="Tabla" class="card">
                    <div class="card-content">
                        <h1>LISTA DE DEUDAS</h1>
                        <table class="table  is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>TIPO</th>
                                    <th>VALOR</th>
                                    <th>Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, idx) in this.FireBaseData" :key="idx">
                                    <td>{{item.NombreIngreso}}</td>
                                    <td>{{item.ValorIngreso}}</td>
                                    <td>{{item.TipoIngreso}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                    <h1>información</h1>
                    <table class="table  is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th><abbr title="Position">Pos</abbr></th>
                                <th>Team</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <td>Total ahorro</td>
                                <td>{{dineroLibre}}</td>
                            </tr>
                            <tr>
                                <td>Total DEUDAS</td>
                                <td>{{totalDeudas}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </section >
</template>

<script>
import firebase from "firebase";
export default {
    name: "Body",
    data: () => {
    return {
        presupuesto: "400000",
        NombreIngreso: "",
        ValorIngreso: "",
        TipoIngreso: "",
        FireBaseData: [],
        dineroLibre: 0,
        totalDeudas: 0
    };
    },
    created() {
        this.GetData();
    },
    mounted() {
        setTimeout(() => {
        this.GetDebts(this.FireBaseData);
        }, 1000);
        setTimeout(() => {
        this.GetCashFree();
        }, 1100);
    },
    methods: {
        saveData(event) {
        event.preventDefault();
        alert("GUARDAR DATOS");
        let itemsRef = firebase.database().ref("data");
        itemsRef
            .push({
            NombreIngreso: this.NombreIngreso,
            ValorIngreso: this.ValorIngreso,
            TipoIngreso: this.TipoIngreso
            })
            .then(() => {
            this.ClearData();
            this.GetDebts(this.FireBaseData);
            this.GetCashFree();
            });
        },
        GetData() {
        let itemsRef = firebase.database().ref("data");
        itemsRef.on("value", snapshot => {
            this.FireBaseData = snapshot.val();
        });
        },
        GetDebts(datos) {
        for (let key in datos) {
            if (datos[key].TipoIngreso === "DEUDA") {
            this.totalDeudas =
                parseInt(this.totalDeudas) + parseInt(datos[key].ValorIngreso);
            }
        }
        },
        GetCashFree() {
        return (this.dineroLibre =
            parseInt(this.presupuesto) - parseInt(this.totalDeudas));
        },
        Changepresupuesto(){
            this.GetDebts(this.FireBaseData);
            this.GetCashFree();
        },
        ClearData() {
        this.NombreIngreso = "";
        this.ValorIngreso = "";
        this.TipoIngreso = "";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 28px;
  font-family: cursive;
  text-transform: uppercase;
  color: hsl(217, 71%, 53%) !important;
}
#Tabla {
  overflow-y: scroll;
}

.card {
  height: 500px;
}
</style>
