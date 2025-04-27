import { SalesForm } from "../organism/Sales/SalesForm"
import { TableSales } from "../organism/Sales/TableSales"

import '../../assets/styles/Pages/sales_Page.css'
export const Sales=()=>{
    return(
        <div className="sales-container2">
            <SalesForm/>
            <TableSales/>
        </div>
    )
}