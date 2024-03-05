'use client'

import "../../styles-admin/layout/custom.css"
import React,  { useState,useEffect,useRef, Key  } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import { Toolbar } from 'primereact/toolbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import TableDaytime from "./table-daytime";
import CreateCollectedForm from "./createCollectedForm";
import { array } from "zod";

interface DataTableCommon {
	values: any[];
	header:boolean;
	footer:string;
	th:any;
  }

const TableCommon:React.FC<DataTableCommon>=({values,header,footer,th})=>{
	
	//toast ref
    const toast = useRef<Toast>(null);

	//dialog daytime
	const [visible, setVisible] = useState(false);
	//dialog add
	const [displayAdd, setDisplayAdd] = useState(false);
	
	//[id, start, end, daytime, active, daytimeId]
	const keys = values.length>0 ? Object.keys(values[0]) : ""

	

	const startContent = (
        <span className="text-xl text-900 font-bold">Thời gian thu thập</span>
    );

	const endContent = (
        <React.Fragment>
			<Button  
				className="custom-add-daytime rounded mr-2" 
				icon="pi pi-external-link" rounded raised
				severity="help"
				tooltip="daytime informations" 
				onClick={() => setVisible(true)} 
				tooltipOptions={{ position: 'top' }}
			/>
			<Tooltip className="tooltip-add" target=".custom-add-daytime" />
			<Dialog header="Thời gian trong ngày" className="dialog-size" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
				<TableDaytime
					toast={toast}
				></TableDaytime>
			</Dialog>

        	 <Button 
            	className="custom-add-user rounded mr-2" 
            	icon="pi pi-plus-circle" rounded raised
            	severity="info"
            	tooltip="add daytime"
				onClick={() => setDisplayAdd(true)}  
            	tooltipOptions={{ position: 'top' }}
           	/>
            <Tooltip className="tooltip-add" target=".custom-add-user" />
			<Dialog header="Thêm thời gian thu thập" className="dialog-size" visible={displayAdd} maximizable style={{ width: '50vw' }} onHide={() => setDisplayAdd(false)}>
				<CreateCollectedForm toast={toast} onHide={setDisplayAdd}/>
			</Dialog>


            <Button 
            	className="custom-delete rounded"  	
            	icon="pi pi-minus-circle" rounded raised
            	severity="warning"
            	tooltip="delete all users" 
            	tooltipOptions={{ position: 'top' }}      
           	/>
            <Tooltip className="tooltip-banned" target=".custom-delete" />     
        </React.Fragment>
    );

	const  head= header ? (
			<Toolbar className="border border-0" start={startContent} end={endContent} />
		) : ""

	


    const foot = footer ? footer : ""


const calculateDaytimeTotal = (name: string) => {
	let total = 0;

	if (values) {
		for (let val of values) {
			if ((val as any)?.daytimeName === name) {
				total++;
			}
		}
	}

	return total;
};

    const headerTemplate = (value:any) => {
        return (
            <div className="time-of-day flex align-items-center gap-2">
                <img alt="morning" src={value.daytimeImage} width="32" height="32" />
                <span className="font-bold">{value.daytimeName}</span>
            </div>
        );
    };
   	
   	const footerTemplate = (value:any) => {
        return (
            <React.Fragment>
                <td colSpan={6}>
                    <div className="flex justify-content-end font-bold w-full">Total: {calculateDaytimeTotal(value?.daytimeName)}</div>
                </td>
            </React.Fragment>
        );
    };



	


	return(
		<div className="card p-3">
			<Toast ref={toast} position="bottom-right"></Toast>
			<DataTable value={values ? values : []} 
					   paginator rows={5} 
					   rowsPerPageOptions={[5, 10, 25, 50]} 
					   header={head} 
					   footer={foot}
					   tableStyle={{ minWidth: '60rem' }}
					   rowGroupMode="subheader" 
					   groupRowsBy="daytimeId"
					   dataKey="id"
					   scrollable 
					   scrollHeight="400px"
					   rowGroupHeaderTemplate={headerTemplate}
					   rowGroupFooterTemplate={footerTemplate}
			>
				{keys && keys.map((value:string,index:number)=>{
					
					return [
					
						keys.length-1 != index && <Column field={value} header={th ? th[value] : value}></Column>,
					]
				})}
			    
			</DataTable>
			
		</div>
	)
}


export default TableCommon