'use client'
import React,  { useState,useEffect,useRef  } from 'react'
import { getUsers, bannerUser, usersSelector } from '../../store/reducers/UserSlices'
import { useSelector, useDispatch } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { Tooltip } from 'primereact/tooltip';
import { Toolbar } from 'primereact/toolbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const AllUser=()=>{

	//dispatch redux
	const dispatch = useDispatch();

	//get redux users array
	const data = useSelector(usersSelector)
	
	//row click
	const [rowClick, setRowClick] = useState(true);
	const [selectedProducts, setSelectedProducts] = useState(null);

	//status button
	const [btnDisabled, setBtnDisabled] = useState(true);

	//banned action
	const toast = useRef(null);

	const handleBannedAction = () => {
		const arrayId=(selectedProducts as any)?.map((item:any) => item.id)


		return new Promise((resolve, reject) => {
			dispatch(bannerUser(arrayId) as any)
			.then((rs:any) => {
				(toast.current as any)?.show({ severity: 'info', summary: 'Banned', detail: 'Cấm người dùng thành công!', life: 3000 });
				resolve(rs);
			  })
			.catch(() => {
				(toast.current as any)?.show({ severity: 'danger', summary: 'Banned', detail: 'lỗi không xác định!', life: 3000 });
				reject();
			});
		})
		// try{
		// 	dispatch(bannerUser(arrayId) as any)
		// 	console.log(a)
        // 	(toast.current as any)?.show({ severity: 'info', summary: 'Banned', detail: 'Cấm người dùng thành công!', life: 3000 });
		// }catch(error){
		// 	console.log(error)
		// 	(toast.current as any)?.show({ severity: 'danger', summary: 'Banned', detail: 'lỗi không xác định!', life: 3000 });
		// }
		
    }

    const handleDeleteAction = () => {
        (toast.current as any)?.show({ severity: 'info', summary: 'Delete', detail: 'Xoá người dùng thành công!', life: 3000 });
    }

	const handleBanned = () => {
        confirmDialog({
            message: 'bạn có muốn cấm các tài khoản?',
            header: 'Banner user',
            icon: 'pi pi-exclamation-triangle',
            accept:()=>handleBannedAction()
        });
    };

    //delete action
    const handleDelete = () => {
        confirmDialog({
            message: 'bạn có muốn xoá các tài khoản?',
            header: 'Delete user',
            icon: 'pi pi-exclamation-triangle',
            accept:()=>handleDeleteAction()
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
            	className="custom-delete-user rounded mr-2" 
            	icon="pi pi-times" rounded raised
            	severity="danger"
            	tooltip="delete users" 
            	tooltipOptions={{ position: 'top' }}
            	onClick={handleDelete}
            	disabled={btnDisabled}
           	/>
            <Tooltip className="tooltip-delete" target=".custom-delete-user" />

            <Button 
            	className="custom-banned rounded"  	
            	icon="pi pi-ban" rounded raised
            	severity="warning"
            	tooltip="banner users" 
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


export default AllUser