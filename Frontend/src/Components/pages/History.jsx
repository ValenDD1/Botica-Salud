import { Title } from "../atoms/Titles/Title"
import { Chart } from 'primereact/chart';
import { useEffect,useState } from "react";
import { Usercard } from "../molecules/Usercard";

import { faDollar } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faCube } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";


import '../../assets/styles/Pages/history.css'


export const History=()=>{

    const navigate=useNavigate();

    const [inventario,setInventario]=useState([]);
    const [ventas,setVentas]=useState([]);
    const [servicios,setServicios]=useState([]);

    const HandleInventarioProduct=async()=>{
        const response=await fetch('http://localhost:3000/api/historial/inventario');
        const data=await response.json();
        setInventario(data[0].total);
    }
    const HandleVentas=async()=>{
        const response=await fetch('http://localhost:3000/api/historial/ganancias');
        const data=await response.json();
        setVentas(`$ ${data[0].ganancias}`);
    }
    const HandleServicios=async()=>{
        const response=await fetch('http://localhost:3000/api/historial/consultas');
        const data=await response.json();
        setServicios(data[0].filas);
    }

    HandleInventarioProduct();
    HandleVentas();
    HandleServicios();

    const Data=[
        {
            nombre:'inventario',
            icono: faCube,
            cantidad:inventario,
            onClick:()=> navigate('/inventario')


        },
        {
            nombre:'Consultas',
            icono: faUser,
            cantidad:servicios,
            onClick:()=> navigate('/servicios')
        },
        {
            nombre:'Ganancias',
            icono:faDollar,
            cantidad:ventas,
            onClick:()=> navigate('/ventas')
        }
    ]

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    

    useEffect(() => {
        const data = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    const [PieData, setPieData] = useState({});
    const [PieOptions, setPieOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['pasta dental', 'panadol', 'paracetamol'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setPieData(data);
        setPieOptions(options);
    }, []);



    return(
        <div className="history-container">
            <Title title='Historial' hs="h3" />
            <section className="history-header" >
                {Data.map((item,index)=><Usercard key={index} data={item} />)}
            </section>
            <section className="grafics">
                <Chart type="bar" data={chartData} options={chartOptions} />
                <Chart type="pie" data={PieData} options={PieOptions} />
            </section>

        </div>
    )
}