// Datos de división política del Ecuador (Provincia > Cantón > Parroquia)
// Generado a partir del paquete ecuador-postal-codes (24 provincias, 221 cantones, 1396 parroquias)

export type Parroquia = string;

export type Canton = {
  canton: string;
  parroquias: Parroquia[];
};

export type Provincia = {
  provincia: string;
  cantones: Canton[];
};

export const provinciasEcuador: Provincia[] = [
  {
    "provincia": "AZUAY",
    "cantones": [
      {
        "canton": "CAMILO PONCE ENRÍQUEZ",
        "parroquias": [
          "CAMILO PONCE ENRÍQUEZ",
          "EL CARMEN DE PIJILÍ"
        ]
      },
      {
        "canton": "CHORDELEG",
        "parroquias": [
          "CHORDELEG",
          "LA UNIÓN",
          "LUIS GALARZA ORELLANA (CAB.EN DELEGSOL)",
          "PRINCIPAL",
          "SAN MARTÍN DE PUZHIO"
        ]
      },
      {
        "canton": "CUENCA",
        "parroquias": [
          "BAÑOS",
          "BELLAVISTA",
          "CAÑARIBAMBA",
          "CHAUCHA",
          "CHECA (JIDCAY)",
          "CHIQUINTAD",
          "CUENCA",
          "CUMBE",
          "EL BATÁN",
          "EL SAGRARIO",
          "EL VECINO",
          "GIL RAMÍREZ DÁVALOS",
          "HERMANO MIGUEL",
          "HUAYNACÁPAC",
          "LLACAO",
          "MACHÁNGARA",
          "MOLLETURO",
          "MONAY",
          "NULTI",
          "OCTAVIO CORDERO PALACIOS (SANTA ROSA)",
          "PACCHA",
          "QUINGEO",
          "RICAURTE",
          "SAN BLAS",
          "SAN JOAQUÍN",
          "SAN SEBASTIÁN",
          "SANTA ANA",
          "SAYAUSÍ",
          "SIDCAY",
          "SININCAY",
          "SUCRE",
          "TARQUI",
          "TOTORACOCHA",
          "TURI",
          "VALLE",
          "VICTORIA DEL PORTETE (IRQUIS)",
          "YANUNCAY"
        ]
      },
      {
        "canton": "EL PAN",
        "parroquias": [
          "AMALUZA",
          "EL PAN",
          "PALMAS",
          "SAN VICENTE"
        ]
      },
      {
        "canton": "GIRÓN",
        "parroquias": [
          "ASUNCIÓN",
          "GIRÓN",
          "SAN GERARDO"
        ]
      },
      {
        "canton": "GUACHAPALA",
        "parroquias": [
          "GUACHAPALA"
        ]
      },
      {
        "canton": "GUALACEO",
        "parroquias": [
          "CHORDELEG",
          "DANIEL CÓRDOVA TORAL (EL ORIENTE)",
          "GUALACEO",
          "JADÁN",
          "LUIS CORDERO VEGA",
          "MARIANO MORENO",
          "PRINCIPAL",
          "REMIGIO CRESPO TORAL (GÚLAG)",
          "SAN JUAN",
          "SIMÓN BOLÍVAR (CAB. EN GAÑANZOL)",
          "ZHIDMAD"
        ]
      },
      {
        "canton": "NABÓN",
        "parroquias": [
          "COCHAPATA",
          "EL PROGRESO (CAB.EN ZHOTA)",
          "LAS NIEVES (CHAYA)",
          "NABÓN",
          "OÑA"
        ]
      },
      {
        "canton": "OÑA",
        "parroquias": [
          "SAN FELIPE DE OÑA CABECERA CANTONAL",
          "SUSUDEL"
        ]
      },
      {
        "canton": "PAUTE",
        "parroquias": [
          "AMALUZA",
          "BULÁN (JOSÉ VÍCTOR IZQUIERDO)",
          "CHICÁN (GUILLERMO ORTEGA)",
          "DUG DUG",
          "EL CABO",
          "GUACHAPALA",
          "GUARAINAG",
          "PALMAS",
          "PAN",
          "PAUTE",
          "SAN CRISTÓBAL (CARLOS ORDÓÑEZ LAZO)",
          "SEVILLA DE ORO",
          "TOMEBAMBA"
        ]
      },
      {
        "canton": "PUCARA",
        "parroquias": [
          "CAMILO PONCE ENRÍQUEZ (CAB. EN RÍO 7 DE MOLLEPONGO)",
          "PUCARÁ",
          "SAN RAFAEL DE SHARUG"
        ]
      },
      {
        "canton": "SAN FERNANDO",
        "parroquias": [
          "CHUMBLÍN",
          "SAN FERNANDO"
        ]
      },
      {
        "canton": "SANTA ISABEL",
        "parroquias": [
          "ABDÓN CALDERÓN (LA UNIÓN)",
          "EL CARMEN DE PIJILÍ",
          "SAN SALVADOR DE CAÑARIBAMBA",
          "SANTA ISABEL (CHAGUARURCO)",
          "ZHAGLLI (SHAGLLI)"
        ]
      },
      {
        "canton": "SEVILLA DE ORO",
        "parroquias": [
          "AMALUZA",
          "PALMAS",
          "SEVILLA DE ORO"
        ]
      },
      {
        "canton": "SIGSIG",
        "parroquias": [
          "CUCHIL (CUTCHIL)",
          "GIMA",
          "GUEL",
          "LUDO",
          "SAN BARTOLOMÉ",
          "SAN JOSÉ DE RARANGA",
          "SIGSIG"
        ]
      }
    ]
  },
  {
    "provincia": "BOLIVAR",
    "cantones": [
      {
        "canton": "CALUMA",
        "parroquias": [
          "CALUMA"
        ]
      },
      {
        "canton": "CHILLANES",
        "parroquias": [
          "CHILLANES",
          "SAN JOSÉ DEL TAMBO (TAMBOPAMBA)"
        ]
      },
      {
        "canton": "CHIMBO",
        "parroquias": [
          "ASUNCIÓN (ASANCOTO)",
          "CALUMA",
          "MAGDALENA (CHAPACOTO)",
          "SAN JOSÉ DE CHIMBO",
          "SAN SEBASTIÁN",
          "TELIMBELA"
        ]
      },
      {
        "canton": "ECHEANDÍA",
        "parroquias": [
          "ECHEANDÍA"
        ]
      },
      {
        "canton": "GUARANDA",
        "parroquias": [
          "FACUNDO VELA",
          "GABRIEL IGNACIO VEINTIMILLA",
          "GUANUJO",
          "GUANUJO",
          "GUARANDA",
          "JULIO E. MORENO (CATANAHUÁN GRANDE)",
          "LAS NAVES",
          "SALINAS",
          "SAN LORENZO",
          "SAN LUIS DE PAMBIL",
          "SAN SIMÓN (YACOTO)",
          "SANTA FÉ (SANTA FÉ)",
          "SIMIÁTUG",
          "ÁNGEL POLIBIO CHÁVES"
        ]
      },
      {
        "canton": "LAS NAVES",
        "parroquias": [
          "LAS MERCEDES",
          "LAS NAVES",
          "LAS NAVES"
        ]
      },
      {
        "canton": "SAN MIGUEL",
        "parroquias": [
          "BALSAPAMBA",
          "BILOVÁN",
          "RÉGULO DE MORA",
          "SAN MIGUEL",
          "SAN PABLO (SAN PABLO DE ATENAS)",
          "SAN VICENTE",
          "SANTIAGO"
        ]
      }
    ]
  },
  {
    "provincia": "CAÑAR",
    "cantones": [
      {
        "canton": "AZOGUES",
        "parroquias": [
          "AURELIO BAYAS MARTÍNEZ",
          "AZOGUES",
          "AZOGUES",
          "BORRERO",
          "COJITAMBO",
          "DÉLEG",
          "GUAPÁN",
          "JAVIER LOYOLA (CHUQUIPATA)",
          "LUIS CORDERO",
          "PINDILIG",
          "RIVERA",
          "SAN FRANCISCO",
          "SAN MIGUEL",
          "SOLANO",
          "TADAY"
        ]
      },
      {
        "canton": "BIBLIÁN",
        "parroquias": [
          "BIBLIÁN",
          "JERUSALÉN",
          "NAZÓN (CAB. EN PAMPA DE DOMÍNGUEZ)",
          "SAN FRANCISCO DE SAGEO",
          "TURUPAMBA"
        ]
      },
      {
        "canton": "CAÑAR",
        "parroquias": [
          "CAÑAR",
          "CHONTAMARCA",
          "CHOROCOPTE",
          "DUCUR",
          "GENERAL MORALES (SOCARTE)",
          "GUALLETURO",
          "HONORATO VÁSQUEZ (TAMBO VIEJO)",
          "INGAPIRCA",
          "JUNCAL",
          "SAN ANTONIO",
          "SUSCAL",
          "TAMBO",
          "VENTURA",
          "ZHUD"
        ]
      },
      {
        "canton": "DÉLEG",
        "parroquias": [
          "DÉLEG",
          "SOLANO"
        ]
      },
      {
        "canton": "EL TAMBO",
        "parroquias": [
          "EL TAMBO"
        ]
      },
      {
        "canton": "LA TRONCAL",
        "parroquias": [
          "LA TRONCAL",
          "MANUEL J. CALLE",
          "PANCHO NEGRO"
        ]
      },
      {
        "canton": "SUSCAL",
        "parroquias": [
          "SUSCAL"
        ]
      }
    ]
  },
  {
    "provincia": "CARCHI",
    "cantones": [
      {
        "canton": "BOLÍVAR",
        "parroquias": [
          "BOLÍVAR",
          "GARCÍA MORENO",
          "LOS ANDES",
          "MONTE OLIVO",
          "SAN RAFAEL",
          "SAN VICENTE DE PUSIR"
        ]
      },
      {
        "canton": "ESPEJO",
        "parroquias": [
          "27 DE SEPTIEMBRE",
          "EL ANGEL",
          "EL GOALTAL",
          "EL ÁNGEL",
          "LA LIBERTAD (ALIZO)",
          "SAN ISIDRO"
        ]
      },
      {
        "canton": "MIRA",
        "parroquias": [
          "CONCEPCIÓN",
          "JIJÓN Y CAAMAÑO (CAB. EN RÍO BLANCO)",
          "JUAN MONTALVO (SAN IGNACIO DE QUIL)",
          "MIRA (CHONTAHUASI)"
        ]
      },
      {
        "canton": "MONTÚFAR",
        "parroquias": [
          "CHITÁN DE NAVARRETE",
          "CRISTÓBAL COLÓN",
          "FERNÁNDEZ SALVADOR",
          "GONZÁLEZ SUÁREZ",
          "LA PAZ",
          "PIARTAL",
          "SAN GABRIEL",
          "SAN JOSÉ"
        ]
      },
      {
        "canton": "SAN PEDRO DE HUACA",
        "parroquias": [
          "HUACA",
          "MARISCAL SUCRE"
        ]
      },
      {
        "canton": "TULCÁN",
        "parroquias": [
          "EL CARMELO (EL PUN)",
          "EL CHICAL",
          "GONZÁLEZ SUÁREZ",
          "HUACA",
          "JULIO ANDRADE (OREJUELA)",
          "MALDONADO",
          "MARISCAL SUCRE",
          "PIOTER",
          "SANTA MARTHA DE CUBA",
          "TOBAR DONOSO (LA BOCANA DE CAMUMBÍ)",
          "TUFIÑO",
          "TULCÁN",
          "TULCÁN",
          "URBINA (TAYA)"
        ]
      }
    ]
  },
  {
    "provincia": "CHIMBORAZO",
    "cantones": [
      {
        "canton": "ALAUSI",
        "parroquias": [
          "ACHUPALLAS",
          "ALAUSÍ",
          "CUMANDÁ",
          "GUASUNTOS",
          "HUIGRA",
          "MULTITUD",
          "PISTISHÍ (NARIZ DEL DIABLO)",
          "PUMALLACTA",
          "SEVILLA",
          "SIBAMBE",
          "TIXÁN"
        ]
      },
      {
        "canton": "CHAMBO",
        "parroquias": [
          "CHAMBO"
        ]
      },
      {
        "canton": "CHUNCHI",
        "parroquias": [
          "CAPZOL",
          "CHUNCHI",
          "COMPUD",
          "GONZOL",
          "LLAGOS"
        ]
      },
      {
        "canton": "COLTA",
        "parroquias": [
          "CAJABAMBA",
          "CAÑI",
          "COLUMBE",
          "JUAN DE VELASCO (PANGOR)",
          "SANTIAGO DE QUITO (CAB. EN SAN ANTONIO DE QUITO)",
          "SICALPA",
          "VILLA LA UNIÓN (CAJABAMBA)"
        ]
      },
      {
        "canton": "CUMANDÁ",
        "parroquias": [
          "CUMANDÁ"
        ]
      },
      {
        "canton": "GUAMOTE",
        "parroquias": [
          "CEBADAS",
          "GUAMOTE",
          "PALMIRA"
        ]
      },
      {
        "canton": "GUANO",
        "parroquias": [
          "EL ROSARIO",
          "GUANANDO",
          "GUANO",
          "ILAPO",
          "LA MATRIZ",
          "LA PROVIDENCIA",
          "SAN ANDRÉS",
          "SAN GERARDO DE PACAICAGUÁN",
          "SAN ISIDRO DE PATULÚ",
          "SAN JOSÉ DEL CHAZO",
          "SANTA FÉ DE GALÁN",
          "VALPARAÍSO"
        ]
      },
      {
        "canton": "PALLATANGA",
        "parroquias": [
          "PALLATANGA"
        ]
      },
      {
        "canton": "PENIPE",
        "parroquias": [
          "BILBAO (CAB.EN QUILLUYACU)",
          "EL ALTAR",
          "LA CANDELARIA",
          "MATUS",
          "PENIPE",
          "PUELA",
          "SAN ANTONIO DE BAYUSHIG"
        ]
      },
      {
        "canton": "RIOBAMBA",
        "parroquias": [
          "CACHA (CAB. EN MACHÁNGARA)",
          "CALPI",
          "CUBIJÍES",
          "FLORES",
          "LICTO",
          "LICÁN",
          "LIZARZABURU",
          "MALDONADO",
          "PUNGALÁ",
          "PUNÍN",
          "QUIMIAG",
          "RIOBAMBA",
          "SAN JUAN",
          "SAN LUIS",
          "VELASCO",
          "VELOZ",
          "YARUQUÍES"
        ]
      }
    ]
  },
  {
    "provincia": "COTOPAXI",
    "cantones": [
      {
        "canton": "LA MANÁ",
        "parroquias": [
          "EL CARMEN",
          "EL TRIUNFO",
          "GUASAGANDA (CAB.EN GUASAGANDA",
          "LA MANÁ",
          "LA MANÁ",
          "PUCAYACU"
        ]
      },
      {
        "canton": "LATACUNGA",
        "parroquias": [
          "11 DE NOVIEMBRE (ILINCHISI)",
          "ALAQUES (ALÁQUEZ)",
          "BELISARIO QUEVEDO (GUANAILÍN)",
          "ELOY ALFARO (SAN FELIPE)",
          "GUAITACAMA (GUAYTACAMA)",
          "IGNACIO FLORES (PARQUE FLORES)",
          "JOSEGUANGO BAJO",
          "JUAN MONTALVO (SAN SEBASTIÁN)",
          "LA MATRIZ",
          "LAS PAMPAS",
          "LATACUNGA",
          "MULALÓ",
          "PALO QUEMADO",
          "POALÓ",
          "SAN BUENAVENTURA",
          "SAN JUAN DE PASTOCALLE",
          "SIGCHOS",
          "TANICUCHÍ",
          "TOACASO"
        ]
      },
      {
        "canton": "PANGUA",
        "parroquias": [
          "EL CORAZÓN",
          "MORASPUNGO",
          "PINLLOPATA",
          "RAMÓN CAMPAÑA"
        ]
      },
      {
        "canton": "PUJILI",
        "parroquias": [
          "ANGAMARCA",
          "CHUCCHILÁN (CHUGCHILÁN)",
          "GUANGAJE",
          "ISINLIBÍ (ISINLIVÍ)",
          "LA VICTORIA",
          "PILALÓ",
          "PUJILÍ",
          "TINGO",
          "ZUMBAHUA"
        ]
      },
      {
        "canton": "SALCEDO",
        "parroquias": [
          "ANTONIO JOSÉ HOLGUÍN (SANTA LUCÍA)",
          "CUSUBAMBA",
          "MULALILLO",
          "MULLIQUINDIL (SANTA ANA)",
          "PANSALEO",
          "SAN MIGUEL"
        ]
      },
      {
        "canton": "SAQUISILÍ",
        "parroquias": [
          "CANCHAGUA",
          "CHANTILÍN",
          "COCHAPAMBA",
          "SAQUISILÍ"
        ]
      },
      {
        "canton": "SIGCHOS",
        "parroquias": [
          "CHUGCHILLÁN",
          "ISINLIVÍ",
          "LAS PAMPAS",
          "PALO QUEMADO",
          "SIGCHOS"
        ]
      }
    ]
  },
  {
    "provincia": "EL ORO",
    "cantones": [
      {
        "canton": "ARENILLAS",
        "parroquias": [
          "ARENILLAS",
          "CARCABÓN",
          "CHACRAS",
          "LA LIBERTAD",
          "LAS LAJAS (CAB. EN LA VICTORIA)",
          "PALMALES"
        ]
      },
      {
        "canton": "ATAHUALPA",
        "parroquias": [
          "AYAPAMBA",
          "CORDONCILLO",
          "MILAGRO",
          "PACCHA",
          "SAN JOSÉ",
          "SAN JUAN DE CERRO AZUL"
        ]
      },
      {
        "canton": "BALSAS",
        "parroquias": [
          "BALSAS",
          "BELLAMARÍA"
        ]
      },
      {
        "canton": "CHILLA",
        "parroquias": [
          "CHILLA"
        ]
      },
      {
        "canton": "EL GUABO",
        "parroquias": [
          "BARBONES (SUCRE)",
          "EL GUABO",
          "LA IBERIA",
          "RÍO BONITO",
          "TENDALES (CAB.EN PUERTO TENDALES)"
        ]
      },
      {
        "canton": "HUAQUILLAS",
        "parroquias": [
          "ECUADOR",
          "EL PARAÍSO",
          "HUALTACO",
          "HUAQUILLAS",
          "MILTON REYES",
          "UNIÓN LOJANA"
        ]
      },
      {
        "canton": "LAS LAJAS",
        "parroquias": [
          "EL PARAÍSO",
          "LA LIBERTAD",
          "LA VICTORIA",
          "LA VICTORIA",
          "PLATANILLOS",
          "SAN ISIDRO",
          "VALLE HERMOSO"
        ]
      },
      {
        "canton": "MACHALA",
        "parroquias": [
          "EL CAMBIO",
          "EL CAMBIO",
          "EL RETIRO",
          "LA PROVIDENCIA",
          "MACHALA",
          "MACHALA",
          "NUEVE DE MAYO",
          "PUERTO BOLÍVAR"
        ]
      },
      {
        "canton": "MARCABELÍ",
        "parroquias": [
          "EL INGENIO",
          "MARCABELÍ"
        ]
      },
      {
        "canton": "PASAJE",
        "parroquias": [
          "BOLÍVAR",
          "BUENAVISTA",
          "CASACAY",
          "CAÑAQUEMADA",
          "LA PEAÑA",
          "LOMA DE FRANCO",
          "OCHOA LEÓN (MATRIZ)",
          "PASAJE",
          "PROGRESO",
          "TRES CERRITOS",
          "UZHCURRUMI"
        ]
      },
      {
        "canton": "PIÑAS",
        "parroquias": [
          "CAPIRO (CAB. EN LA CAPILLA DE CAPIRO)",
          "LA BOCANA",
          "LA MATRIZ",
          "LA SUSAYA",
          "MOROMORO (CAB. EN EL VADO)",
          "PIEDRAS",
          "PIÑAS",
          "PIÑAS GRANDE",
          "SAN ROQUE (AMBROSIO MALDONADO)",
          "SARACAY"
        ]
      },
      {
        "canton": "PORTOVELO",
        "parroquias": [
          "CURTINCAPA",
          "MORALES",
          "PORTOVELO",
          "SALATÍ"
        ]
      },
      {
        "canton": "SANTA ROSA",
        "parroquias": [
          "BALNEARIO JAMBELÍ (SATÉLITE)",
          "BELLAMARÍA",
          "BELLAVISTA",
          "JAMBELÍ",
          "JUMÓN (SATÉLITE)",
          "LA AVANZADA",
          "NUEVO SANTA ROSA",
          "PUERTO JELÍ",
          "SAN ANTONIO",
          "SANTA ROSA",
          "SANTA ROSA",
          "TORATA",
          "VICTORIA"
        ]
      },
      {
        "canton": "ZARUMA",
        "parroquias": [
          "ABAÑÍN",
          "ARCAPAMBA",
          "GUANAZÁN",
          "GUIZHAGUIÑA",
          "HUERTAS",
          "MALVAS",
          "MULUNCAY GRANDE",
          "SALVIAS",
          "SINSAO",
          "ZARUMA"
        ]
      }
    ]
  },
  {
    "provincia": "ESMERALDAS",
    "cantones": [
      {
        "canton": "ATACAMES",
        "parroquias": [
          "ATACAMES",
          "LA UNIÓN",
          "SÚA (CAB. EN LA BOCANA)",
          "TONCHIGÜE",
          "TONSUPA"
        ]
      },
      {
        "canton": "ELOY ALFARO",
        "parroquias": [
          "ANCHAYACU",
          "ATAHUALPA (CAB. EN CAMARONES)",
          "BORBÓN",
          "COLÓN ELOY DEL MARÍA",
          "LA TOLA",
          "LUIS VARGAS TORRES (CAB. EN PLAYA DE ORO)",
          "MALDONADO",
          "PAMPANAL DE BOLÍVAR",
          "SAN FRANCISCO DE ONZOLE",
          "SAN JOSÉ DE CAYAPAS",
          "SANTO DOMINGO DE ONZOLE",
          "SELVA ALEGRE",
          "TELEMBÍ",
          "TIMBIRÉ",
          "VALDEZ (LIMONES)"
        ]
      },
      {
        "canton": "ESMERALDAS",
        "parroquias": [
          "5 DE AGOSTO",
          "ATACAMES",
          "BARTOLOMÉ RUIZ (CÉSAR FRANCO CARRIÓN)",
          "CAMARONES (CAB. EN SAN VICENTE)",
          "CHINCA",
          "CHONTADURO",
          "CHUMUNDÉ",
          "CRNEL. CARLOS CONCHA TORRES (CAB.EN HUELE)",
          "ESMERALDAS",
          "ESMERALDAS",
          "LA UNIÓN",
          "LAGARTO",
          "LUIS TELLO (LAS PALMAS)",
          "MAJUA",
          "MONTALVO (CAB. EN HORQUETA)",
          "ROCAFUERTE",
          "RÍO VERDE",
          "SAN MATEO",
          "SIMÓN PLATA TORRES",
          "SÚA (CAB. EN LA BOCANA)",
          "TABIAZO",
          "TACHINA",
          "TONCHIGÜE",
          "VUELTA LARGA"
        ]
      },
      {
        "canton": "LA CONCORDIA",
        "parroquias": [
          "LA CONCORDIA",
          "LA VILLEGAS",
          "MONTERREY",
          "PLAN PILOTO"
        ]
      },
      {
        "canton": "MUISNE",
        "parroquias": [
          "BOLÍVAR",
          "DAULE",
          "GALERA",
          "MUISNE",
          "QUINGUE (OLMEDO PERDOMO FRANCO)",
          "SALIMA",
          "SAN FRANCISCO",
          "SAN GREGORIO",
          "SAN JOSÉ DE CHAMANGA (CAB.EN CHAMANGA)"
        ]
      },
      {
        "canton": "QUININDÉ",
        "parroquias": [
          "CHURA (CHANCAMA) (CAB. EN EL YERBERO)",
          "CUBE",
          "LA UNIÓN",
          "MALIMPIA",
          "ROSA ZÁRATE (QUININDÉ)",
          "VICHE"
        ]
      },
      {
        "canton": "RIOVERDE",
        "parroquias": [
          "CHONTADURO",
          "CHUMUNDÉ",
          "LAGARTO",
          "MONTALVO (CAB. EN HORQUETA)",
          "RIOVERDE",
          "ROCAFUERTE"
        ]
      },
      {
        "canton": "SAN LORENZO",
        "parroquias": [
          "5 DE JUNIO (CAB. EN UIMBI)",
          "ALTO TAMBO (CAB. EN GUADUAL)",
          "ANCÓN (PICHANGAL) (CAB. EN PALMA REAL)",
          "CALDERÓN",
          "CARONDELET",
          "CONCEPCIÓN",
          "MATAJE (CAB. EN SANTANDER)",
          "SAN JAVIER DE CACHAVÍ (CAB. EN SAN JAVIER)",
          "SAN LORENZO",
          "SANTA RITA",
          "TAMBILLO",
          "TULULBÍ (CAB. EN RICAURTE)",
          "URBINA"
        ]
      }
    ]
  },
  {
    "provincia": "GALAPAGOS",
    "cantones": [
      {
        "canton": "ISABELA",
        "parroquias": [
          "PUERTO VILLAMIL",
          "TOMÁS DE BERLANGA (SANTO TOMÁS)"
        ]
      },
      {
        "canton": "SAN CRISTÓBAL",
        "parroquias": [
          "EL PROGRESO",
          "ISLA SANTA MARÍA (FLOREANA) (CAB. EN PTO. VELASCO IBARRA)",
          "PUERTO BAQUERIZO MORENO"
        ]
      },
      {
        "canton": "SANTA CRUZ",
        "parroquias": [
          "BELLAVISTA",
          "PUERTO AYORA",
          "SANTA ROSA (INCLUYE LA ISLA BALTRA)"
        ]
      }
    ]
  },
  {
    "provincia": "GUAYAS",
    "cantones": [
      {
        "canton": "ALFREDO BAQUERIZO MORENO (JUJÁN)",
        "parroquias": [
          "ALFREDO BAQUERIZO MORENO (JUJÁN)"
        ]
      },
      {
        "canton": "BALAO",
        "parroquias": [
          "BALAO"
        ]
      },
      {
        "canton": "BALZAR",
        "parroquias": [
          "BALZAR"
        ]
      },
      {
        "canton": "COLIMES",
        "parroquias": [
          "COLIMES",
          "SAN JACINTO"
        ]
      },
      {
        "canton": "CORONEL MARCELINO MARIDUEÑA",
        "parroquias": [
          "CORONEL MARCELINO MARIDUEÑA (SAN CARLOS)"
        ]
      },
      {
        "canton": "DAULE",
        "parroquias": [
          "BANIFE",
          "DAULE",
          "DAULE",
          "EMILIANO CAICEDO MARCOS",
          "ISIDRO AYORA (SOLEDAD)",
          "JUAN BAUTISTA AGUIRRE (LOS TINTOS)",
          "LA AURORA (SATÉLITE)",
          "LAUREL",
          "LIMONAL",
          "LOMAS DE SARGENTILLO",
          "LOS LOJAS (ENRIQUE BAQUERIZO MORENO)",
          "MAGRO",
          "PADRE JUAN BAUTISTA AGUIRRE",
          "PIEDRAHITA (NOBOL)",
          "SANTA CLARA",
          "VICENTE PIEDRAHITA"
        ]
      },
      {
        "canton": "DURÁN",
        "parroquias": [
          "EL RECREO",
          "ELOY ALFARO (DURÁN)",
          "ELOY ALFARO (DURÁN)"
        ]
      },
      {
        "canton": "EL EMPALME",
        "parroquias": [
          "EL ROSARIO",
          "GUAYAS (PUEBLO NUEVO)",
          "VELASCO IBARRA (EL EMPALME)"
        ]
      },
      {
        "canton": "EL TRIUNFO",
        "parroquias": [
          "EL TRIUNFO"
        ]
      },
      {
        "canton": "GENERAL ANTONIO ELIZALDE",
        "parroquias": [
          "GENERAL ANTONIO ELIZALDE (BUCAY)"
        ]
      },
      {
        "canton": "GUAYAQUIL",
        "parroquias": [
          "AYACUCHO",
          "BOLÍVAR (SAGRARIO)",
          "CARBO (CONCEPCIÓN)",
          "CHONGÓN",
          "FEBRES CORDERO",
          "GARCÍA MORENO",
          "GUAYAQUIL",
          "JUAN GÓMEZ RENDÓN (PROGRESO)",
          "LETAMENDI",
          "MORRO",
          "NUEVE DE OCTUBRE",
          "OLMEDO (SAN ALEJO)",
          "PASCUALES",
          "PASCUALES",
          "PLAYAS (GRAL. VILLAMIL)",
          "POSORJA",
          "PUNÁ",
          "ROCA",
          "ROCAFUERTE",
          "SUCRE",
          "TARQUI",
          "TENGUEL",
          "URDANETA",
          "XIMENA"
        ]
      },
      {
        "canton": "ISIDRO AYORA",
        "parroquias": [
          "ISIDRO AYORA"
        ]
      },
      {
        "canton": "LOMAS DE SARGENTILLO",
        "parroquias": [
          "ISIDRO AYORA (SOLEDAD)",
          "LOMAS DE SARGENTILLO"
        ]
      },
      {
        "canton": "MILAGRO",
        "parroquias": [
          "CHOBO",
          "GENERAL ELIZALDE (BUCAY)",
          "MARISCAL SUCRE (HUAQUES)",
          "MILAGRO",
          "ROBERTO ASTUDILLO (CAB. EN CRUCE DE VENECIA)"
        ]
      },
      {
        "canton": "NARANJAL",
        "parroquias": [
          "JESÚS MARÍA",
          "NARANJAL",
          "SAN CARLOS",
          "SANTA ROSA DE FLANDES",
          "TAURA"
        ]
      },
      {
        "canton": "NARANJITO",
        "parroquias": [
          "NARANJITO"
        ]
      },
      {
        "canton": "NOBOL",
        "parroquias": [
          "NARCISA DE JESÚS"
        ]
      },
      {
        "canton": "PALESTINA",
        "parroquias": [
          "PALESTINA"
        ]
      },
      {
        "canton": "PEDRO CARBO",
        "parroquias": [
          "PEDRO CARBO",
          "SABANILLA",
          "VALLE DE LA VIRGEN"
        ]
      },
      {
        "canton": "PLAYAS",
        "parroquias": [
          "GENERAL VILLAMIL (PLAYAS)"
        ]
      },
      {
        "canton": "SALITRE (URBINA JADO)",
        "parroquias": [
          "BOCANA",
          "CANDILEJOS",
          "CENTRAL",
          "EL SALITRE (LAS RAMAS)",
          "GRAL. VERNAZA (DOS ESTEROS)",
          "JUNQUILLAL",
          "LA VICTORIA (ÑAUZA)",
          "PARAÍSO",
          "SAN MATEO"
        ]
      },
      {
        "canton": "SAMBORONDÓN",
        "parroquias": [
          "LA PUNTILLA (SATÉLITE)",
          "SAMBORONDÓN",
          "SAMBORONDÓN",
          "TARIFA"
        ]
      },
      {
        "canton": "SAN JACINTO DE YAGUACHI",
        "parroquias": [
          "CRNEL. LORENZO DE GARAICOA (PEDREGAL)",
          "CRNEL. MARCELINO MARIDUEÑA (SAN CARLOS)",
          "GRAL. PEDRO J. MONTERO (BOLICHE)",
          "SAN JACINTO DE YAGUACHI",
          "SIMÓN BOLÍVAR",
          "VIRGEN DE FÁTIMA",
          "YAGUACHI VIEJO (CONE)"
        ]
      },
      {
        "canton": "SANTA LUCÍA",
        "parroquias": [
          "SANTA LUCÍA"
        ]
      },
      {
        "canton": "SIMÓN BOLÍVAR",
        "parroquias": [
          "CRNEL.LORENZO DE GARAICOA (PEDREGAL)",
          "SIMÓN BOLÍVAR"
        ]
      }
    ]
  },
  {
    "provincia": "IMBABURA",
    "cantones": [
      {
        "canton": "ANTONIO ANTE",
        "parroquias": [
          "ANDRADE MARÍN (LOURDES)",
          "ATUNTAQUI",
          "ATUNTAQUI",
          "IMBAYA (SAN LUIS DE COBUENDO)",
          "SAN FRANCISCO DE NATABUELA",
          "SAN JOSÉ DE CHALTURA",
          "SAN ROQUE"
        ]
      },
      {
        "canton": "COTACACHI",
        "parroquias": [
          "6 DE JULIO DE CUELLAJE (CAB. EN CUELLAJE)",
          "APUELA",
          "COTACACHI",
          "GARCÍA MORENO (LLURIMAGUA)",
          "IMANTAG",
          "PEÑAHERRERA",
          "PLAZA GUTIÉRREZ (CALVARIO)",
          "QUIROGA",
          "SAGRARIO",
          "SAN FRANCISCO",
          "VACAS GALINDO (EL CHURO) (CAB.EN SAN MIGUEL ALTO"
        ]
      },
      {
        "canton": "IBARRA",
        "parroquias": [
          "AMBUQUÍ",
          "ANGOCHAGUA",
          "CARANQUI",
          "CAROLINA",
          "GUAYAQUIL DE ALPACHACA",
          "LA DOLOROSA DEL PRIORATO",
          "LA ESPERANZA",
          "LITA",
          "SAGRARIO",
          "SALINAS",
          "SAN ANTONIO",
          "SAN FRANCISCO",
          "SAN MIGUEL DE IBARRA"
        ]
      },
      {
        "canton": "OTAVALO",
        "parroquias": [
          "DR. MIGUEL EGAS CABEZAS (PEGUCHE)",
          "EUGENIO ESPEJO (CALPAQUÍ)",
          "GONZÁLEZ SUÁREZ",
          "JORDÁN",
          "OTAVALO",
          "PATAQUÍ",
          "SAN JOSÉ DE QUICHINCHE",
          "SAN JUAN DE ILUMÁN",
          "SAN LUIS",
          "SAN PABLO",
          "SAN RAFAEL",
          "SELVA ALEGRE (CAB.EN SAN MIGUEL DE PAMPLONA)"
        ]
      },
      {
        "canton": "PIMAMPIRO",
        "parroquias": [
          "CHUGÁ",
          "MARIANO ACOSTA",
          "PIMAMPIRO",
          "SAN FRANCISCO DE SIGSIPAMBA"
        ]
      },
      {
        "canton": "SAN MIGUEL DE URCUQUÍ",
        "parroquias": [
          "CAHUASQUÍ",
          "LA MERCED DE BUENOS AIRES",
          "PABLO ARENAS",
          "SAN BLAS",
          "TUMBABIRO",
          "URCUQUÍ CABECERA CANTONAL"
        ]
      }
    ]
  },
  {
    "provincia": "LOJA",
    "cantones": [
      {
        "canton": "CALVAS",
        "parroquias": [
          "CARIAMANGA",
          "CARIAMANGA",
          "CHILE",
          "COLAISACA",
          "EL LUCERO",
          "SAN VICENTE",
          "SANGUILLÍN",
          "UTUANA"
        ]
      },
      {
        "canton": "CATAMAYO",
        "parroquias": [
          "CATAMAYO",
          "CATAMAYO (LA TOMA)",
          "EL TAMBO",
          "GUAYQUICHUMA",
          "SAN JOSÉ",
          "SAN PEDRO DE LA BENDITA",
          "ZAMBI"
        ]
      },
      {
        "canton": "CELICA",
        "parroquias": [
          "12 DE DICIEMBRE (CAB. EN ACHIOTES)",
          "CELICA",
          "CHAQUINAL",
          "CRUZPAMBA (CAB. EN CARLOS BUSTAMANTE)",
          "PINDAL (FEDERICO PÁEZ)",
          "POZUL (SAN JUAN DE POZUL)",
          "SABANILLA",
          "TNTE. MAXIMILIANO RODRÍGUEZ LOAIZA"
        ]
      },
      {
        "canton": "CHAGUARPAMBA",
        "parroquias": [
          "AMARILLOS",
          "BUENAVISTA",
          "CHAGUARPAMBA",
          "EL ROSARIO",
          "SANTA RUFINA"
        ]
      },
      {
        "canton": "ESPÍNDOLA",
        "parroquias": [
          "27 DE ABRIL (CAB. EN LA NARANJA)",
          "AMALUZA",
          "BELLAVISTA",
          "EL AIRO",
          "EL INGENIO",
          "JIMBURA",
          "SANTA TERESITA"
        ]
      },
      {
        "canton": "GONZANAMÁ",
        "parroquias": [
          "CHANGAIMINA (LA LIBERTAD)",
          "FUNDOCHAMBA",
          "GONZANAMÁ",
          "NAMBACOLA",
          "PURUNUMA (EGUIGUREN)",
          "QUILANGA (LA PAZ)",
          "SACAPALCA",
          "SAN ANTONIO DE LAS ARADAS (CAB. EN LAS ARADAS)"
        ]
      },
      {
        "canton": "LOJA",
        "parroquias": [
          "CHANTACO",
          "CHUQUIRIBAMBA",
          "EL CISNE",
          "EL SAGRARIO",
          "GUALEL",
          "JIMBILLA",
          "LOJA",
          "MALACATOS (VALLADOLID)",
          "QUINARA",
          "SAN LUCAS",
          "SAN PEDRO DE VILCABAMBA",
          "SAN SEBASTIÁN",
          "SANTIAGO",
          "SUCRE",
          "TAQUIL (MIGUEL RIOFRÍO)",
          "VALLE",
          "VILCABAMBA (VICTORIA)",
          "YANGANA (ARSENIO CASTILLO)"
        ]
      },
      {
        "canton": "MACARÁ",
        "parroquias": [
          "GENERAL ELOY ALFARO (SAN SEBASTIÁN)",
          "LA VICTORIA",
          "LARAMA",
          "MACARÁ",
          "MACARÁ (MANUEL ENRIQUE RENGEL SUQUILANDA)",
          "SABIANGO (LA CAPILLA)"
        ]
      },
      {
        "canton": "OLMEDO",
        "parroquias": [
          "LA TINGUE",
          "OLMEDO"
        ]
      },
      {
        "canton": "PALTAS",
        "parroquias": [
          "CANGONAMÁ",
          "CASANGA",
          "CATACOCHA",
          "CATACOCHA",
          "GUACHANAMÁ",
          "LA TINGUE",
          "LAURO GUERRERO",
          "LOURDES",
          "OLMEDO (SANTA BÁRBARA)",
          "ORIANGA",
          "SAN ANTONIO",
          "YAMANA"
        ]
      },
      {
        "canton": "PINDAL",
        "parroquias": [
          "12 DE DICIEMBRE (CAB.EN ACHIOTES)",
          "CHAQUINAL",
          "MILAGROS",
          "PINDAL"
        ]
      },
      {
        "canton": "PUYANGO",
        "parroquias": [
          "ALAMOR",
          "CIANO",
          "EL ARENAL",
          "EL LIMO (MARIANA DE JESÚS)",
          "MERCADILLO",
          "VICENTINO"
        ]
      },
      {
        "canton": "QUILANGA",
        "parroquias": [
          "FUNDOCHAMBA",
          "QUILANGA",
          "SAN ANTONIO DE LAS ARADAS (CAB. EN LAS ARADAS)"
        ]
      },
      {
        "canton": "SARAGURO",
        "parroquias": [
          "EL PARAÍSO DE CELÉN",
          "EL TABLÓN",
          "LLUZHAPA",
          "MANÚ",
          "SAN ANTONIO DE QUMBE (CUMBE)",
          "SAN PABLO DE TENTA",
          "SAN SEBASTIÁN DE YÚLUC",
          "SARAGURO",
          "SELVA ALEGRE",
          "SUMAYPAMBA",
          "URDANETA (PAQUISHAPA)"
        ]
      },
      {
        "canton": "SOZORANGA",
        "parroquias": [
          "NUEVA FÁTIMA",
          "SOZORANGA",
          "TACAMOROS"
        ]
      },
      {
        "canton": "ZAPOTILLO",
        "parroquias": [
          "BOLASPAMBA",
          "GARZAREAL",
          "LIMONES",
          "MANGAHURCO (CAZADEROS)",
          "PALETILLAS",
          "ZAPOTILLO"
        ]
      }
    ]
  },
  {
    "provincia": "LOS RIOS",
    "cantones": [
      {
        "canton": "BABA",
        "parroquias": [
          "BABA",
          "GUARE",
          "ISLA DE BEJUCAL"
        ]
      },
      {
        "canton": "BABAHOYO",
        "parroquias": [
          "BABAHOYO",
          "BARREIRO",
          "BARREIRO (SANTA RITA)",
          "CARACOL",
          "CLEMENTE BAQUERIZO",
          "DR. CAMILO PONCE",
          "EL SALTO",
          "FEBRES CORDERO (LAS JUNTAS)",
          "LA UNIÓN",
          "PIMOCHA"
        ]
      },
      {
        "canton": "BUENA FÉ",
        "parroquias": [
          "11 DE OCTUBRE",
          "7 DE AGOSTO",
          "PATRICIA PILAR",
          "SAN JACINTO DE BUENA FÉ",
          "SAN JACINTO DE BUENA FÉ"
        ]
      },
      {
        "canton": "MOCACHE",
        "parroquias": [
          "MOCACHE"
        ]
      },
      {
        "canton": "MONTALVO",
        "parroquias": [
          "MONTALVO"
        ]
      },
      {
        "canton": "PALENQUE",
        "parroquias": [
          "PALENQUE"
        ]
      },
      {
        "canton": "PUEBLOVIEJO",
        "parroquias": [
          "PUEBLOVIEJO",
          "PUERTO PECHICHE",
          "SAN JUAN"
        ]
      },
      {
        "canton": "QUEVEDO",
        "parroquias": [
          "24 DE MAYO",
          "BUENA FÉ",
          "GUAYACÁN",
          "LA ESPERANZA",
          "MOCACHE",
          "NICOLÁS INFANTE DÍAZ",
          "QUEVEDO",
          "QUEVEDO",
          "SAN CAMILO",
          "SAN CARLOS",
          "SAN CRISTÓBAL",
          "SAN JOSÉ",
          "SIETE DE OCTUBRE",
          "VALENCIA",
          "VENUS DEL RÍO QUEVEDO",
          "VIVA ALFARO"
        ]
      },
      {
        "canton": "QUINSALOMA",
        "parroquias": [
          "QUINSALOMA"
        ]
      },
      {
        "canton": "URDANETA",
        "parroquias": [
          "CATARAMA",
          "RICAURTE"
        ]
      },
      {
        "canton": "VALENCIA",
        "parroquias": [
          "VALENCIA"
        ]
      },
      {
        "canton": "VENTANAS",
        "parroquias": [
          "10 DE NOVIEMBRE",
          "CHACARITA",
          "LOS ÁNGELES",
          "QUINSALOMA",
          "VENTANAS",
          "ZAPOTAL"
        ]
      },
      {
        "canton": "VÍNCES",
        "parroquias": [
          "ANTONIO SOTOMAYOR (CAB. EN PLAYAS DE VINCES)",
          "PALENQUE",
          "VINCES"
        ]
      }
    ]
  },
  {
    "provincia": "MANABI",
    "cantones": [
      {
        "canton": "24 DE MAYO",
        "parroquias": [
          "ARQ. SIXTO DURÁN BALLÉN",
          "BELLAVISTA",
          "NOBOA",
          "SUCRE"
        ]
      },
      {
        "canton": "BOLÍVAR",
        "parroquias": [
          "CALCETA",
          "MEMBRILLO",
          "QUIROGA"
        ]
      },
      {
        "canton": "CHONE",
        "parroquias": [
          "BOYACÁ",
          "CANUTO",
          "CHIBUNGA",
          "CHONE",
          "CHONE",
          "CONVENTO",
          "ELOY ALFARO",
          "RICAURTE",
          "SAN ANTONIO",
          "SANTA RITA"
        ]
      },
      {
        "canton": "EL CARMEN",
        "parroquias": [
          "4 DE DICIEMBRE",
          "EL CARMEN",
          "EL CARMEN",
          "SAN PEDRO DE SUMA",
          "WILFRIDO LOOR MOREIRA (MAICITO)"
        ]
      },
      {
        "canton": "FLAVIO ALFARO",
        "parroquias": [
          "FLAVIO ALFARO",
          "SAN FRANCISCO DE NOVILLO (CAB. EN",
          "ZAPALLO"
        ]
      },
      {
        "canton": "JAMA",
        "parroquias": [
          "JAMA"
        ]
      },
      {
        "canton": "JARAMIJÓ",
        "parroquias": [
          "JARAMIJÓ"
        ]
      },
      {
        "canton": "JIPIJAPA",
        "parroquias": [
          "AMÉRICA",
          "DR. MIGUEL MORÁN LUCIO",
          "EL ANEGADO (CAB. EN ELOY ALFARO)",
          "JIPIJAPA",
          "JULCUY",
          "LA UNIÓN",
          "MACHALILLA",
          "MANUEL INOCENCIO PARRALES Y GUALE",
          "MEMBRILLAL",
          "PEDRO PABLO GÓMEZ",
          "PUERTO DE CAYO",
          "PUERTO LÓPEZ",
          "SAN LORENZO DE JIPIJAPA"
        ]
      },
      {
        "canton": "JUNÍN",
        "parroquias": [
          "JUNÍN"
        ]
      },
      {
        "canton": "MANTA",
        "parroquias": [
          "ELOY ALFARO",
          "LOS ESTEROS",
          "MANTA",
          "MANTA",
          "SAN LORENZO",
          "SAN MATEO",
          "SANTA MARIANITA (BOCA DE PACOCHE)",
          "TARQUI"
        ]
      },
      {
        "canton": "MONTECRISTI",
        "parroquias": [
          "ANIBAL SAN ANDRÉS",
          "EL COLORADO",
          "GENERAL ELOY ALFARO",
          "JARAMIJÓ",
          "LA PILA",
          "LEONIDAS PROAÑO",
          "MONTECRISTI",
          "MONTECRISTI"
        ]
      },
      {
        "canton": "OLMEDO",
        "parroquias": [
          "OLMEDO"
        ]
      },
      {
        "canton": "PAJÁN",
        "parroquias": [
          "CAMPOZANO (LA PALMA DE PAJÁN)",
          "CASCOL",
          "GUALE",
          "LASCANO",
          "PAJÁN"
        ]
      },
      {
        "canton": "PEDERNALES",
        "parroquias": [
          "10 DE AGOSTO",
          "ATAHUALPA",
          "COJIMÍES",
          "PEDERNALES"
        ]
      },
      {
        "canton": "PICHINCHA",
        "parroquias": [
          "BARRAGANETE",
          "PICHINCHA",
          "SAN SEBASTIÁN"
        ]
      },
      {
        "canton": "PORTOVIEJO",
        "parroquias": [
          "12 DE MARZO",
          "18 DE OCTUBRE",
          "ABDÓN CALDERÓN (SAN FRANCISCO)",
          "ALHAJUELA (BAJO GRANDE)",
          "ANDRÉS DE VERA",
          "CHIRIJOS",
          "COLÓN",
          "CRUCITA",
          "FRANCISCO PACHECO",
          "PICOAZÁ",
          "PORTOVIEJO",
          "PORTOVIEJO",
          "PUEBLO NUEVO",
          "RIOCHICO (RÍO CHICO)",
          "SAN PABLO",
          "SAN PLÁCIDO",
          "SIMÓN BOLÍVAR"
        ]
      },
      {
        "canton": "PUERTO LÓPEZ",
        "parroquias": [
          "MACHALILLA",
          "PUERTO LÓPEZ",
          "SALANGO"
        ]
      },
      {
        "canton": "ROCAFUERTE",
        "parroquias": [
          "ROCAFUERTE"
        ]
      },
      {
        "canton": "SAN VICENTE",
        "parroquias": [
          "CANOA",
          "SAN VICENTE"
        ]
      },
      {
        "canton": "SANTA ANA",
        "parroquias": [
          "AYACUCHO",
          "HONORATO VÁSQUEZ (CAB. EN VÁSQUEZ)",
          "LA UNIÓN",
          "LODANA",
          "OLMEDO",
          "SAN PABLO (CAB. EN PUEBLO NUEVO)",
          "SANTA ANA",
          "SANTA ANA DE VUELTA LARGA"
        ]
      },
      {
        "canton": "SUCRE",
        "parroquias": [
          "10 DE AGOSTO",
          "BAHÍA DE CARÁQUEZ",
          "BAHÍA DE CARÁQUEZ",
          "CANOA",
          "CHARAPOTÓ",
          "COJIMÍES",
          "JAMA",
          "LEONIDAS PLAZA GUTIÉRREZ",
          "PEDERNALES",
          "SAN ISIDRO",
          "SAN VICENTE"
        ]
      },
      {
        "canton": "TOSAGUA",
        "parroquias": [
          "ANGEL PEDRO GILER (LA ESTANCILLA)",
          "BACHILLERO",
          "TOSAGUA"
        ]
      }
    ]
  },
  {
    "provincia": "MORONA SANTIAGO",
    "cantones": [
      {
        "canton": "GUALAQUIZA",
        "parroquias": [
          "AMAZONAS (ROSARIO DE CUYES)",
          "BERMEJOS",
          "BOMBOIZA",
          "CHIGÜINDA",
          "EL IDEAL",
          "EL ROSARIO",
          "GUALAQUIZA",
          "GUALAQUIZA",
          "MERCEDES MOLINA",
          "NUEVA TARQUI",
          "SAN MIGUEL DE CUYES"
        ]
      },
      {
        "canton": "HUAMBOYA",
        "parroquias": [
          "CHIGUAZA",
          "HUAMBOYA",
          "PABLO SEXTO"
        ]
      },
      {
        "canton": "LIMÓN INDANZA",
        "parroquias": [
          "GENERAL LEONIDAS PLAZA GUTIÉRREZ (LIMÓN)",
          "INDANZA",
          "PAN DE AZÚCAR",
          "SAN ANTONIO (CAB. EN SAN ANTONIO CENTRO",
          "SAN CARLOS DE LIMÓN (SAN CARLOS DEL",
          "SAN JUAN BOSCO",
          "SAN MIGUEL DE CONCHAY",
          "SANTA SUSANA DE CHIVIAZA (CAB. EN CHIVIAZA)",
          "YUNGANZA (CAB. EN EL ROSARIO)"
        ]
      },
      {
        "canton": "LOGROÑO",
        "parroquias": [
          "LOGROÑO",
          "SHIMPIS",
          "YAUPI"
        ]
      },
      {
        "canton": "MORONA",
        "parroquias": [
          "ALSHI (CAB. EN 9 DE OCTUBRE)",
          "CHIGUAZA",
          "CUCHAENTZA",
          "GENERAL PROAÑO",
          "HUASAGA (CAB.EN WAMPUIK)",
          "MACAS",
          "MACUMA",
          "RÍO BLANCO",
          "SAN ISIDRO",
          "SAN JOSÉ DE MORONA",
          "SEVILLA DON BOSCO",
          "SINAÍ",
          "TAISHA",
          "TUUTINENTZA",
          "ZUÑA (ZÚÑAC)"
        ]
      },
      {
        "canton": "PABLO SEXTO",
        "parroquias": [
          "PABLO SEXTO"
        ]
      },
      {
        "canton": "PALORA",
        "parroquias": [
          "ARAPICOS",
          "CUMANDÁ (CAB. EN COLONIA AGRÍCOLA SEVILLA DEL ORO)",
          "HUAMBOYA",
          "PALORA (METZERA)",
          "SANGAY (CAB. EN NAYAMANACA)"
        ]
      },
      {
        "canton": "SAN JUAN BOSCO",
        "parroquias": [
          "PAN DE AZÚCAR",
          "SAN CARLOS DE LIMÓN",
          "SAN JACINTO DE WAKAMBEIS",
          "SAN JUAN BOSCO",
          "SANTIAGO DE PANANZA"
        ]
      },
      {
        "canton": "SANTIAGO",
        "parroquias": [
          "CHUPIANZA",
          "COPAL",
          "PATUCA",
          "SAN FRANCISCO DE CHINIMBIMI",
          "SAN LUIS DE EL ACHO (CAB. EN EL ACHO)",
          "SANTIAGO",
          "SANTIAGO DE MÉNDEZ",
          "TAYUZA"
        ]
      },
      {
        "canton": "SUCÚA",
        "parroquias": [
          "ASUNCIÓN",
          "HUAMBI",
          "LOGROÑO",
          "SANTA MARIANITA DE JESÚS",
          "SUCÚA",
          "YAUPI"
        ]
      },
      {
        "canton": "TAISHA",
        "parroquias": [
          "HUASAGA (CAB. EN WAMPUIK)",
          "MACUMA",
          "PUMPUENTSA",
          "TAISHA",
          "TUUTINENTZA"
        ]
      },
      {
        "canton": "TIWINTZA",
        "parroquias": [
          "SAN JOSÉ DE MORONA",
          "SANTIAGO"
        ]
      }
    ]
  },
  {
    "provincia": "NAPO",
    "cantones": [
      {
        "canton": "ARCHIDONA",
        "parroquias": [
          "ARCHIDONA",
          "AVILA",
          "COTUNDO",
          "LORETO",
          "PUERTO MURIALDO",
          "SAN PABLO DE USHPAYACU"
        ]
      },
      {
        "canton": "CARLOS JULIO AROSEMENA TOLA",
        "parroquias": [
          "CARLOS JULIO AROSEMENA TOLA"
        ]
      },
      {
        "canton": "EL CHACO",
        "parroquias": [
          "EL CHACO",
          "GONZALO DíAZ DE PINEDA (EL BOMBÓN)",
          "LINARES",
          "OYACACHI",
          "SANTA ROSA",
          "SARDINAS"
        ]
      },
      {
        "canton": "QUIJOS",
        "parroquias": [
          "BAEZA",
          "COSANGA",
          "CUYUJA",
          "PAPALLACTA",
          "SAN FRANCISCO DE BORJA (VIRGILIO DÁVILA)",
          "SAN JOSÉ DEL PAYAMINO",
          "SUMACO"
        ]
      },
      {
        "canton": "TENA",
        "parroquias": [
          "AHUANO",
          "CARLOS JULIO AROSEMENA TOLA (ZATZA-YACU)",
          "CHONTAPUNTA",
          "PANO",
          "PUERTO MISAHUALLI",
          "PUERTO NAPO",
          "SAN JUAN DE MUYUNA",
          "TENA",
          "TÁLAG"
        ]
      }
    ]
  },
  {
    "provincia": "ORELLANA",
    "cantones": [
      {
        "canton": "AGUARICO",
        "parroquias": [
          "CAPITÁN AUGUSTO RIVADENEYRA",
          "CONONACO",
          "NUEVO ROCAFUERTE",
          "SANTA MARÍA DE HUIRIRIMA",
          "TIPITINI",
          "TIPUTINI",
          "YASUNÍ"
        ]
      },
      {
        "canton": "LA JOYA DE LOS SACHAS",
        "parroquias": [
          "ENOKANQUI",
          "LA JOYA DE LOS SACHAS",
          "LAGO SAN PEDRO",
          "POMPEYA",
          "RUMIPAMBA",
          "SAN CARLOS",
          "SAN SEBASTIÁN DEL COCA",
          "TRES DE NOVIEMBRE",
          "UNIÓN MILAGREÑA"
        ]
      },
      {
        "canton": "LORETO",
        "parroquias": [
          "AVILA (CAB. EN HUIRUNO)",
          "LORETO",
          "PUERTO MURIALDO",
          "SAN JOSÉ DE DAHUANO",
          "SAN JOSÉ DE PAYAMINO",
          "SAN VICENTE DE HUATICOCHA"
        ]
      },
      {
        "canton": "ORELLANA",
        "parroquias": [
          "ALEJANDRO LABAKA",
          "DAYUMA",
          "EL DORADO",
          "EL EDÉN",
          "GARCÍA MORENO",
          "INÉS ARANGO (CAB. EN WESTERN)",
          "LA BELLEZA",
          "NUEVO PARAÍSO (CAB. EN UNIÓN",
          "PUERTO FRANCISCO DE ORELLANA (EL COCA)",
          "SAN JOSÉ DE GUAYUSA",
          "SAN LUIS DE ARMENIA",
          "TARACOA (NUEVA ESPERANZA: YUCA)"
        ]
      }
    ]
  },
  {
    "provincia": "PASTAZA",
    "cantones": [
      {
        "canton": "ARAJUNO",
        "parroquias": [
          "ARAJUNO",
          "CURARAY"
        ]
      },
      {
        "canton": "MERA",
        "parroquias": [
          "MADRE TIERRA",
          "MERA",
          "SHELL"
        ]
      },
      {
        "canton": "PASTAZA",
        "parroquias": [
          "ARAJUNO",
          "CANELOS",
          "CURARAY",
          "DIEZ DE AGOSTO",
          "EL TRIUNFO",
          "FÁTIMA",
          "MONTALVO (ANDOAS)",
          "POMONA",
          "PUYO",
          "RÍO CORRIENTES",
          "RÍO TIGRE",
          "SANTA CLARA",
          "SARAYACU",
          "SIMÓN BOLÍVAR (CAB. EN MUSHULLACTA)",
          "TARQUI",
          "TENIENTE HUGO ORTIZ",
          "VERACRUZ (INDILLAMA) (CAB. EN INDILLAMA)"
        ]
      },
      {
        "canton": "SANTA CLARA",
        "parroquias": [
          "SAN JOSÉ",
          "SANTA CLARA"
        ]
      }
    ]
  },
  {
    "provincia": "PICHINCHA",
    "cantones": [
      {
        "canton": "CAYAMBE",
        "parroquias": [
          "ASCÁZUBI",
          "AYORA",
          "CANGAHUA",
          "CAYAMBE",
          "CAYAMBE",
          "JUAN MONTALVO",
          "OLMEDO (PESILLO)",
          "OTÓN",
          "SANTA ROSA DE CUZUBAMBA"
        ]
      },
      {
        "canton": "MEJIA",
        "parroquias": [
          "ALOASÍ",
          "ALÓAG",
          "CUTUGLAHUA",
          "EL CHAUPI",
          "MACHACHI",
          "MANUEL CORNEJO ASTORGA (TANDAPI)",
          "TAMBILLO",
          "UYUMBICHO"
        ]
      },
      {
        "canton": "PEDRO MONCAYO",
        "parroquias": [
          "LA ESPERANZA",
          "MALCHINGUÍ",
          "TABACUNDO",
          "TOCACHI",
          "TUPIGACHI"
        ]
      },
      {
        "canton": "PEDRO VICENTE MALDONADO",
        "parroquias": [
          "PEDRO VICENTE MALDONADO"
        ]
      },
      {
        "canton": "PUERTO QUITO",
        "parroquias": [
          "PUERTO QUITO"
        ]
      },
      {
        "canton": "QUITO",
        "parroquias": [
          "ALANGASÍ",
          "AMAGUAÑA",
          "ATAHUALPA",
          "BELISARIO QUEVEDO",
          "CALACALÍ",
          "CALDERÓN",
          "CARCELÉN",
          "CENTRO HISTÓRICO",
          "CHAVEZPAMBA",
          "CHECA",
          "CHILIBULO",
          "CHILLOGALLO",
          "CHIMBACALLE",
          "COCHAPAMBA",
          "COMITÉ DEL PUEBLO",
          "CONOCOTO",
          "COTOCOLLAO",
          "CUMBAYÁ",
          "EL CONDADO",
          "EL QUINCHE",
          "GUALEA",
          "GUAMANÍ",
          "GUANGOPOLO",
          "GUAYLLABAMBA",
          "ITCHIMBÍA",
          "IÑAQUITO",
          "JIPIJAPA",
          "KENNEDY",
          "LA ARGELIA",
          "LA CONCEPCIÓN",
          "LA ECUATORIANA",
          "LA FERROVIARIA",
          "LA LIBERTAD",
          "LA MAGDALENA",
          "LA MENA",
          "LA MERCED",
          "LLANO CHICO",
          "LLOA",
          "MARISCAL SUCRE",
          "MINDO",
          "NANEGAL",
          "NANEGALITO",
          "NAYÓN",
          "NONO",
          "PACTO",
          "PEDRO VICENTE MALDONADO",
          "PERUCHO",
          "PIFO",
          "POMASQUI",
          "PONCEANO",
          "PUEMBO",
          "PUENGASÍ",
          "PUERTO QUITO",
          "PUÉLLARO",
          "PÍNTAG",
          "QUITO DISTRITO METROPOLITANO",
          "QUITUMBE",
          "RUMIPAMBA",
          "SAN ANTONIO",
          "SAN BARTOLO",
          "SAN ISIDRO DEL INCA",
          "SAN JOSÉ DE MINAS",
          "SAN JUAN",
          "SAN MIGUEL DE LOS BANCOS",
          "SOLANDA",
          "TABABELA",
          "TUMBACO",
          "TURUBAMBA",
          "YARUQUÍ",
          "ZAMBIZA"
        ]
      },
      {
        "canton": "RUMIÑAHUI",
        "parroquias": [
          "COTOGCHOA",
          "RUMIPAMBA",
          "SAN PEDRO DE TABOADA",
          "SAN RAFAEL",
          "SANGOLQUI",
          "SANGOLQUÍ"
        ]
      },
      {
        "canton": "SAN MIGUEL DE LOS BANCOS",
        "parroquias": [
          "MINDO",
          "PEDRO VICENTE MALDONADO",
          "PUERTO QUITO",
          "SAN MIGUEL DE LOS BANCOS"
        ]
      }
    ]
  },
  {
    "provincia": "SANTA ELENA",
    "cantones": [
      {
        "canton": "LA LIBERTAD",
        "parroquias": [
          "LA LIBERTAD"
        ]
      },
      {
        "canton": "SALINAS",
        "parroquias": [
          "ANCONCITO",
          "CARLOS ESPINOZA LARREA",
          "GRAL. ALBERTO ENRÍQUEZ GALLO",
          "JOSÉ LUIS TAMAYO (MUEY)",
          "SALINAS",
          "SANTA ROSA",
          "VICENTE ROCAFUERTE"
        ]
      },
      {
        "canton": "SANTA ELENA",
        "parroquias": [
          "ATAHUALPA",
          "BALLENITA",
          "CHANDUY",
          "COLONCHE",
          "MANGLARALTO",
          "SAN JOSÉ DE ANCÓN",
          "SANTA ELENA",
          "SANTA ELENA",
          "SIMÓN BOLÍVAR (JULIO MORENO)"
        ]
      }
    ]
  },
  {
    "provincia": "SANTO DOMINGO DE LOS TSACHILAS",
    "cantones": [
      {
        "canton": "SANTO DOMINGO",
        "parroquias": [
          "ABRAHAM CALAZACÓN",
          "ALLURIQUÍN",
          "BOMBOLÍ",
          "CHIGUILPE",
          "EL ESFUERZO",
          "LUZ DE AMÉRICA",
          "PUERTO LIMÓN",
          "RÍO TOACHI",
          "RÍO VERDE",
          "SAN JACINTO DEL BÚA",
          "SANTA MARÍA DEL TOACHI",
          "SANTO DOMINGO DE LOS COLORADOS",
          "SANTO DOMINGO DE LOS COLORADOS",
          "VALLE HERMOSO",
          "ZARACAY"
        ]
      }
    ]
  },
  {
    "provincia": "SUCUMBIOS",
    "cantones": [
      {
        "canton": "CASCALES",
        "parroquias": [
          "EL DORADO DE CASCALES",
          "SANTA ROSA DE SUCUMBÍOS",
          "SEVILLA"
        ]
      },
      {
        "canton": "CUYABENO",
        "parroquias": [
          "AGUAS NEGRAS",
          "CUYABENO",
          "TARAPOA"
        ]
      },
      {
        "canton": "GONZALO PIZARRO",
        "parroquias": [
          "EL DORADO DE CASCALES",
          "EL REVENTADOR",
          "GONZALO PIZARRO",
          "LUMBAQUÍ",
          "PUERTO LIBRE",
          "SANTA ROSA DE SUCUMBÍOS"
        ]
      },
      {
        "canton": "LAGO AGRIO",
        "parroquias": [
          "AGUAS NEGRAS",
          "CUYABENO",
          "DURENO",
          "EL ENO",
          "GENERAL FARFÁN",
          "JAMBELÍ",
          "NUEVA LOJA",
          "PACAYACU",
          "SANTA CECILIA",
          "TARAPOA"
        ]
      },
      {
        "canton": "PUTUMAYO",
        "parroquias": [
          "PALMA ROJA",
          "PUERTO BOLÍVAR (PUERTO MONTÚFAR)",
          "PUERTO EL CARMEN DEL PUTUMAYO",
          "PUERTO RODRÍGUEZ",
          "SANTA ELENA"
        ]
      },
      {
        "canton": "SHUSHUFINDI",
        "parroquias": [
          "LIMONCOCHA",
          "PAÑACOCHA",
          "SAN PEDRO DE LOS COFANES",
          "SAN ROQUE (CAB. EN SAN VICENTE)",
          "SHUSHUFINDI",
          "SIETE DE JULIO"
        ]
      },
      {
        "canton": "SUCUMBÍOS",
        "parroquias": [
          "EL PLAYÓN DE SAN FRANCISCO",
          "LA BONITA",
          "LA SOFÍA",
          "ROSA FLORIDA",
          "SANTA BÁRBARA"
        ]
      }
    ]
  },
  {
    "provincia": "TUNGURAHUA",
    "cantones": [
      {
        "canton": "AMBATO",
        "parroquias": [
          "AMBATILLO",
          "AMBATO",
          "ATAHUALPA (CHISALATA)",
          "ATOCHA – FICOA",
          "AUGUSTO N. MARTÍNEZ (MUNDUGLEO)",
          "CELIANO MONGE",
          "CONSTANTINO FERNÁNDEZ (CAB. EN CULLITAHUA)",
          "CUNCHIBAMBA",
          "HUACHI CHICO",
          "HUACHI GRANDE",
          "HUACHI LORETO",
          "IZAMBA",
          "JUAN BENIGNO VELA",
          "LA MERCED",
          "LA PENÍNSULA",
          "MATRIZ",
          "MONTALVO",
          "PASA",
          "PICAIGUA",
          "PILAGÜÍN (PILAHÜÍN)",
          "PISHILATA",
          "QUISAPINCHA (QUIZAPINCHA)",
          "SAN BARTOLOMÉ DE PINLLOG",
          "SAN FERNANDO (PASA SAN FERNANDO)",
          "SAN FRANCISCO",
          "SANTA ROSA",
          "TOTORAS",
          "UNAMUNCHO"
        ]
      },
      {
        "canton": "BAÑOS DE AGUA SANTA",
        "parroquias": [
          "BAÑOS DE AGUA SANTA",
          "LLIGUA",
          "RÍO NEGRO",
          "RÍO VERDE",
          "ULBA"
        ]
      },
      {
        "canton": "CEVALLOS",
        "parroquias": [
          "CEVALLOS"
        ]
      },
      {
        "canton": "MOCHA",
        "parroquias": [
          "MOCHA",
          "PINGUILÍ"
        ]
      },
      {
        "canton": "PATATE",
        "parroquias": [
          "EL TRIUNFO",
          "LOS ANDES (CAB. EN POATUG)",
          "PATATE",
          "SUCRE (CAB. EN SUCRE-PATATE URCU)"
        ]
      },
      {
        "canton": "QUERO",
        "parroquias": [
          "QUERO",
          "RUMIPAMBA",
          "YANAYACU - MOCHAPATA (CAB. EN YANAYACU)"
        ]
      },
      {
        "canton": "SAN PEDRO DE PELILEO",
        "parroquias": [
          "BENÍTEZ (PACHANLICA)",
          "BOLÍVAR",
          "CHIQUICHA (CAB. EN CHIQUICHA GRANDE)",
          "COTALÓ",
          "EL ROSARIO (RUMICHACA)",
          "GARCÍA MORENO (CHUMAQUI)",
          "GUAMBALÓ (HUAMBALÓ)",
          "PELILEO",
          "PELILEO",
          "PELILEO GRANDE",
          "SALASACA"
        ]
      },
      {
        "canton": "SANTIAGO DE PÍLLARO",
        "parroquias": [
          "BAQUERIZO MORENO",
          "CIUDAD NUEVA",
          "EMILIO MARÍA TERÁN (RUMIPAMBA)",
          "MARCOS ESPINEL (CHACATA)",
          "PRESIDENTE URBINA (CHAGRAPAMBA -PATZUCUL)",
          "PÍLLARO",
          "PÍLLARO",
          "SAN ANDRÉS",
          "SAN JOSÉ DE POALÓ",
          "SAN MIGUELITO"
        ]
      },
      {
        "canton": "TISALEO",
        "parroquias": [
          "QUINCHICOTO",
          "TISALEO"
        ]
      }
    ]
  },
  {
    "provincia": "ZAMORA CHINCHIPE",
    "cantones": [
      {
        "canton": "CENTINELA DEL CÓNDOR",
        "parroquias": [
          "PANGUINTZA",
          "PAQUISHA",
          "TRIUNFO-DORADO",
          "ZUMBI"
        ]
      },
      {
        "canton": "CHINCHIPE",
        "parroquias": [
          "CHITO",
          "EL CHORRO",
          "EL PORVENIR DEL CARMEN",
          "LA CHONTA",
          "PALANDA",
          "PUCAPAMBA",
          "SAN ANDRÉS",
          "SAN FRANCISCO DEL VERGEL",
          "VALLADOLID",
          "ZUMBA"
        ]
      },
      {
        "canton": "EL PANGUI",
        "parroquias": [
          "EL GUISME",
          "EL PANGUI",
          "PACHICUTZA",
          "TUNDAYME"
        ]
      },
      {
        "canton": "NANGARITZA",
        "parroquias": [
          "GUAYZIMI",
          "NUEVO PARAÍSO",
          "ZURMI"
        ]
      },
      {
        "canton": "PALANDA",
        "parroquias": [
          "EL PORVENIR DEL CARMEN",
          "LA CANELA",
          "PALANDA",
          "SAN FRANCISCO DEL VERGEL",
          "VALLADOLID"
        ]
      },
      {
        "canton": "PAQUISHA",
        "parroquias": [
          "BELLAVISTA",
          "NUEVO QUITO",
          "PAQUISHA"
        ]
      },
      {
        "canton": "YACUAMBI",
        "parroquias": [
          "28 DE MAYO (SAN JOSÉ DE YACUAMBI)",
          "LA PAZ",
          "TUTUPALI"
        ]
      },
      {
        "canton": "YANTZAZA (YANZATZA)",
        "parroquias": [
          "CHICAÑA",
          "EL PANGUI",
          "LOS ENCUENTROS",
          "YANTZAZA (YANZATZA)"
        ]
      },
      {
        "canton": "ZAMORA",
        "parroquias": [
          "CUMBARATZA",
          "EL LIMÓN",
          "GUADALUPE",
          "IMBANA (LA VICTORIA DE IMBANA)",
          "PAQUISHA",
          "SABANILLA",
          "SAN CARLOS DE LAS MINAS",
          "TIMBARA",
          "ZAMORA",
          "ZAMORA",
          "ZUMBI"
        ]
      }
    ]
  }
];
