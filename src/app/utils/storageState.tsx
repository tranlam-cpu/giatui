//state upload
let stateUpload = false;

export async function setStorageStateUpload (value:boolean) {
	stateUpload = value;
};

export async function getStorageStateUpload () {
  return stateUpload;
};