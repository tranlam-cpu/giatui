'use client'
import React,  { useState,useEffect,useRef  } from 'react'
import { getUsers, unbanUser, bannedUsersSelector } from '../../store/reducers/UserSlices'
import { useSelector, useDispatch } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Tooltip } from 'primereact/tooltip';
import { Toolbar } from 'primereact/toolbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const Banned=()=>{

	//dispatch redux
	const dispatch = useDispatch();

	//get redux users array
	const data = useSelector(bannedUsersSelector)
	
	//row click
	const [rowClick, setRowClick] = useState(true);
	const [selectedProducts, setSelectedProducts] = useState(null);

	//status button
	const [btnDisabled, setBtnDisabled] = useState(true);

	//banned action
	const toast = useRef(null);

	const handleBannedAction = () => {
		const arrayId=(selectedProducts as any)?.map((item:any) => item.id)

		try{
			dispatch(unbanUser(arrayId) as any)
        	(toast.current as any)?.show({ severity: 'info', summary: 'Banned', detail: 'bỏ lệnh cấm thành công!', life: 3000 });
		}catch(error){
			(toast.current as any)?.show({ severity: 'danger', summary: 'Banned', detail: 'lỗi không xác định!', life: 3000 });
		}
		
    }


	const handleBanned = () => {
        confirmDialog({
            message: 'bạn có muốn gỡ lệnh cấm tài khoản?',
            header: 'Unban user',
            icon: 'pi pi-exclamation-triangle',
            accept:()=>handleBannedAction()
        });
    };



	useEffect(()=>{

	    dispatch(getUsers() as any);
	  	
	},[dispatch])

	useEffect(()=>{

	   if((selectedProducts as any)?.length>0){
	   		setBtnDisabled(false);
	   }else{
	   		setBtnDisabled(true);
	   }
	   
	},[selectedProducts])
	

	const startContent = (
        <span className="text-xl text-900 font-bold">Tài khoản người dùng</span>
    );

    const endContent = (
        <React.Fragment>
        	
            <Button 
            	className="custom-banned rounded"  	
            	icon="pi pi-unlock" rounded raised
            	severity="success"
            	tooltip="unban user" 
            	tooltipOptions={{ position: 'top' }}
            	onClick={handleBanned}
            	disabled={btnDisabled}
           	/>
            <Tooltip className="tooltip-banned" target=".custom-banned" />     
        </React.Fragment>
    );



	const header = (
		 <Toolbar className="border border-0" start={startContent} end={endContent} />
    );
    const footer = `Hiện có ${data.users ? data.users.length : 0} tài khoản.`;

   

	return(
	<div className="card p-3">
		<Toast ref={toast} />
		<ConfirmDialog />
		<DataTable value={data.users} 
				   paginator rows={5} 
				   rowsPerPageOptions={[5, 10, 25, 50]} 
				   header={header} 
				   footer={footer}
				   tableStyle={{ minWidth: '60rem' }}
				   selectionMode={rowClick ? null : 'checkbox'} 
				   selection={selectedProducts} 
				   onSelectionChange={(e:any) => setSelectedProducts(e.value)} 
				   dataKey="id"
		>
			<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
		    <Column field="id" header="Id"></Column>
		    <Column field="email" header="Mail"></Column>
		    <Column field="name" header="Tên"></Column>
		    <Column field="banned" header="Bị cấm"></Column>
		    <Column field="role" header="Quyền"></Column>
		    <Column field="isActived" header="Đã xác thực"></Column>
		</DataTable>
	</div>
	)
}


export default Banned