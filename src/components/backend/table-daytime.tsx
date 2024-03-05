'use client'

import "../../styles-admin/layout/custom.css"

import React,  { useState,useEffect,useRef  } from 'react'
import { DataTable } from 'primereact/datatable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { getDaytimes, daytimesSelector, CreateDaytime, DeleteDaytime, UpdateDaytime } from '../../store/reducers/DaytimeSlices'
import { useSelector, useDispatch } from 'react-redux'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";





function useMyCustomHook<T extends HTMLElement>(){
    const myRef = useRef<T>(null)


    return {ref: myRef}
}

const TableDaytime=({toast}: {toast: any})=>{
    
    //dispatch redux
	const dispatch = useDispatch();

    //get redux users array

    const data=useSelector(daytimesSelector)
    const [selectedDaytime, setSelectedDaytime] = useState(null);
    //name is required
    const {ref: errorName}= useMyCustomHook<HTMLInputElement>()
    const [statusName, setStatusName] = useState<any>(null)
    const [checkError, setCheckError] = useState<boolean>(false)

    //file upload
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    //row click - select checkbok
    const [rowClick, setRowClick] = useState(true);
    const [selectedDaytimes, setSelectedDaytimes] = useState(null);


    //state button disbled
	const [btnDisabled, setBtnDisabled] = useState(true);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        // for (let i = 0; i < files.length; i++) {
        //     _totalSize += files[i].size || 0;
        // }

        setTotalSize(files[0].size || 0);
    
    };


    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });
       
        setTotalSize(_totalSize);
        
    };


    const emptyTemplate = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5 text-center">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="d-flex align-items-center ml-auto py-0">
                    <span className="mr-2">{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };
    
   

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
       
        const objectURL = URL.createObjectURL(file); // Generate object URL for the file

        return (
            <div className="d-flex align-items-center p-0 flex-wrap">
                <div className="d-flex align-items-center p-0 me-auto" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={objectURL} width={100} /> {/* Use the objectURL */}
                    <span className="d-flex flex-column text-start ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        // setTotalSize(totalSize - file.size);
        setTotalSize(0);
    
        callback();
    };

    const onTemplateClear = () => {
 
        setTotalSize(0);
    };
    
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    //handle reset
    const handleReset=()=>{
        errorName.current!.value=""
        setStatusName("")
        setCheckError(false)
        fileUploadRef.current?.clear()
    }
    

    
 
    
    

   

    //submit form
    const handleSubmit=(e:any)=>{
        e.preventDefault()
       
        if(errorName.current?.value === ""){
        
            setStatusName(errorName.current?.value)
            setCheckError(true)
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'File Uploaded' });
            return false
        }

        const daytime={
            name: errorName.current?.value,
            image: fileUploadRef.current?.getFiles()
        }

        let state=false;
        
        //server sent event

        const eventSource = new EventSource('/api/sendMessageClient');
        
        eventSource.onmessage = function(event) {
            
            const data = JSON.parse(event.data);
            
            if(data?.state === true){
                handleReset()
                toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
                state=true;
            };

        }
        
        eventSource.onerror = function(error) {
           
            eventSource.close();
        };

        return new Promise<void>((resolve, reject) => {
                dispatch<any>(CreateDaytime(daytime))
                    .then((rs:any) => {    
                        if(!rs.payload){
                            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'File Uploaded' });
                        }
                        //server sent event (SSE)
                        eventSource.close();
                        if(state===false){
                            handleReset()
                            toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
                        }
                        resolve()
                    })
                    .catch((error: any) => {
                        console.log("catch error: "+error)
                    })
        })
        
        
    }
  
    

    const imageBodyTemplate = (data:any) => {
        return <img src={`${data.image}`} alt={data.name} className="shadow-sm rounded" style={{width: '6rem'}} />;
    };
    
    //handle delete checkbox
    const handleDelete=()=>{
        confirmDialog({
            message: 'bạn có muốn xoá thời gian trong ngày đã chọn?',
            header: 'daytimes',
            icon: 'pi pi-exclamation-triangle',
            accept:()=>handleDeleteAction()
        });
    }

    const handleDeleteAction=()=>{
        const arrayId=(selectedDaytimes as any)?.map((item:any) => item.id)

        return new Promise<any>((resolve, reject) => {
            dispatch<any>(DeleteDaytime(arrayId) as any)
            .then(()=>{
                resolve((toast.current as any)?.show({ severity: 'info', summary: 'Deleted', detail: 'Xoá dữ liệu thành công!', life: 3000 }))
            })
            .catch(()=>{    
                reject((toast.current as any)?.show({ severity: 'danger', summary: 'Deleted', detail: 'Lỗi không xác định', life: 3000 }))
            })
        })
            
        
    }

    const toolbarBodyTemplate=()=>{
        return (
        <>
            <Button 
                type="button" 
                icon="pi pi-trash" 
                className="tooltip-target-daytimes p-button-rounded p-button-danger p-button-outlined"
                onClick={handleDelete}
            	disabled={btnDisabled} 
            />
        </>
        )
    }

    //---------------------------------edit mode
    const onRowEditComplete = (e:any) => {
        let _data = [...data];
        let { newData, index } = e;

        _data[index] = newData;
        return new Promise<any>((resolve, reject) => {
            dispatch<any>(UpdateDaytime(_data[index]))
            .then((rs:any)=>{
                if(rs.payload===undefined){
                    resolve((toast.current as any)?.show({ severity: 'danger', summary: 'Updated', detail: 'Cập nhật dữ liệu thất bại!', life: 3000 })) 
                }else{
                    resolve((toast.current as any)?.show({ severity: 'info', summary: 'Updated', detail: 'Cập nhật dữ liệu thành công!', life: 3000 }))
                }
                
            })
            .catch(()=>{    
                reject((toast.current as any)?.show({ severity: 'danger', summary: 'Updated', detail: 'Lỗi không xác định', life: 3000 }))
            })
        })
    };

    
    

    //text editor
    const textEditor = (options:any) => {
        
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    //image editor

    const imageEditor= (option:any)=>{
        
        return (<img 
            src={""} 
            alt={"chọn ảnh"} 
            className="shadow-sm rounded" 
            style={{width: '6rem'}} 
            onClick={(event) => handleImageEditor(event,option)}
            />)
    }

   
    


    const handleImageEditor=(event:any,option:any)=>{
        const fileInput = document.createElement('input');

        fileInput.type = 'file';

        
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {              
                    event.target.src=reader.result;
                    option.editorCallback(file);
                };
                reader.readAsDataURL(file);
            }
        };

        
        fileInput.click();
    }
    // -------------------------------------------

    



    //---------------------------------------effect



    useEffect(() => {
        dispatch<any>(getDaytimes());
    }, [dispatch]);
    
    //check selected checkbox - state disabled button
    useEffect(()=>{

        if((selectedDaytimes as any)?.length>0){
                setBtnDisabled(false);
        }else{
                setBtnDisabled(true);
        }
        
     },[selectedDaytimes])

    return(
        <Container className="py-0">
            <Row className="py-0">
                <Col>
                    <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-middle">
                        <span className="p-float-label mb-2">
                            <InputText
                                id="name"
                                name="name"
                                className="w-100"
                                ref={errorName}
                                type="text"
                            />
                            <label className="input-name">Buổi - Daytime</label>

                        </span>
                        {
                            statusName === "" && checkError && (
                                <span className="text-danger">Name is required</span>
                            )
                        }
                        <label className="mt-3">hình ảnh:</label>
                        
                        <FileUpload 
                            ref={fileUploadRef} 
                            name="imgs[]" 
                            // url="/api/upload"
                            accept="image/*" 
                            maxFileSize={1000000}
                            onUpload={onTemplateUpload} 
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear} 
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate} 
                            itemTemplate={itemTemplate} 
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} 
                            cancelOptions={cancelOptions} 
                        />
                        <Button className="py-2" type="submit" label="Thêm"/>
                    </form>
                </Col>
                <Col className="text-center">
                <ConfirmDialog />
                <DataTable 
                    className="p-0" 
                    scrollable
                    paginator rows={7} 
                    rowsPerPageOptions={[7, 10, 25, 50]} 
                    value={data ? data : []} 
                    tableStyle={{ minWidth: '40%' }}
                    selectionMode={rowClick ? null : 'checkbox'}
                    selection={selectedDaytimes} 
				    onSelectionChange={(e:any) => setSelectedDaytimes(e.value)} 
				    dataKey="id"
                    editMode="row"
                    onRowEditComplete={onRowEditComplete}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '1rem' }}></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="name" editor={(options) => textEditor(options)} header="name"></Column>
                    <Column field="Image" editor={(option)=> imageEditor(option)} body={imageBodyTemplate} header="Image"></Column>
                    <Column rowEditor header={toolbarBodyTemplate} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                </Col>
            </Row>
        </Container>
    )
}

export default TableDaytime