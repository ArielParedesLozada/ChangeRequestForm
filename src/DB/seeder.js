const mysql = require('mysql')
const config = require('../../config')

//PD: Se que esto es feo, y no se debe hacer. Pero modificar el mysql de otro lado hace que me revuelva el estómago
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.dbUser,
    password: config.mysql.dbPass,
    database: config.mysql.dbName,
    port: config.mysql.dbPort,
}

let conexion

function connect() {
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Success")
        }
    })
    conexion.on('error', (err) => {
        console.log(err)
    })
}

function close() {
    if (conexion) {
        conexion.end((err) => {
            if (err) {
                console.error("Error cerrando la conexión:", err);
            } else {
                console.log("Conexión cerrada");
            }
        });
    } else {
        console.log("No hay conexión activa para cerrar.");
    }
}

const SOLICITUDES = [
    `
    CREATE TABLE IF NOT EXISTS solicitudes (
        ID_SOL int(11) NOT NULL,
        TIT_SOL varchar(30) NOT NULL,
        VER_SOL varchar(10) NOT NULL,
        FEC_SOL date NOT NULL,
        PRIO_SOL varchar(10) NOT NULL,
        EST_SOL tinyint(1) DEFAULT NULL,
        DES_SOL text NOT NULL,
        JUST_SOL text NOT NULL,
        ID_PER_SOLICITA varchar(10) NOT NULL,
        ID_PRO_SOL int(11) NOT NULL,
        FEC_REV_SOL date DEFAULT NULL,
        ID_PER_REVISA varchar(10) DEFAULT NULL,
        ENT_SOL varchar(20) DEFAULT NULL,
        MOD_MOD_SOL text DEFAULT NULL,
      MOD_AFE_SOL text DEFAULT NULL
    );
    `,
    `
    ALTER TABLE solicitudes
    ADD PRIMARY KEY (ID_SOL),
    ADD KEY Solicitante_belongsTo_Personal (ID_PER_SOLICITA),
    ADD KEY Revisor_belongsTo_Personal (ID_PER_REVISA),
    ADD KEY Proyecto_belongsTo_Proyecto (ID_PRO_SOL);
    `,
    `
    ALTER TABLE solicitudes
    MODIFY ID_SOL int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
    `,
    `
    ALTER TABLE solicitudes
    ADD CONSTRAINT Proyecto_belongsTo_Proyecto FOREIGN KEY (ID_PRO_SOL) REFERENCES proyectos (ID_PRO),
    ADD CONSTRAINT Revisor_belongsTo_Personal FOREIGN KEY (ID_PER_REVISA) REFERENCES personal (ID_PER),
    ADD CONSTRAINT Solicitante_belongsTo_Personal FOREIGN KEY (ID_PER_SOLICITA) REFERENCES personal (ID_PER);
    `,
]

const PERSONAL = [
    `
    CREATE TABLE IF NOT EXISTS personal (
        ID_PER varchar(10) NOT NULL,
        NOM_PER varchar(25) NOT NULL,
        APE_PER varchar(25) NOT NULL
        );
    `,
    `
    INSERT INTO personal (ID_PER, NOM_PER, APE_PER) VALUES
    ('1801', 'Juan', 'Perez'),
    ('1802', 'Ghanima', 'Atreides');
    `,
    `
    ALTER TABLE personal
    ADD PRIMARY KEY (ID_PER);
    `
]

const PROYECTOS = [
    `
    CREATE TABLE IF NOT EXISTS proyectos (
        ID_PRO int(11) NOT NULL,
        NOM_PRO varchar(25) NOT NULL,
        DES_PRO text NOT NULL
        );
    `,
    `
    INSERT INTO proyectos (ID_PRO, NOM_PRO, DES_PRO) VALUES
    (1, 'Formulario', 'Formulario sencillo para manejar cambios');
    `,
    `
    ALTER TABLE proyectos
    ADD PRIMARY KEY (ID_PRO);
    `,
    `
    ALTER TABLE proyectos
    MODIFY ID_PRO int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
    `
]

connect()

async function migrateAndSeed() {
    try {
        for (let i = 0; i < PERSONAL.length; i++) {
            await conexion.query(PERSONAL[i])            
        }
        for (let j = 0; j < PROYECTOS.length; j++) {
            await conexion.query(PROYECTOS[j])            
        }
        for (let k = 0; k < SOLICITUDES.length; k++) {
            await conexion.query(SOLICITUDES[k])            
        }
        await conexion.query('COMMIT;')
        console.log('Migrations done')
    } catch (error) {
        console.log(error)
    } finally {
        close()
    }
}

migrateAndSeed()