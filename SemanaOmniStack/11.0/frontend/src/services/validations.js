import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default (fieldName, fieldValue) => {
  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'bottom-right',
  });

  if (!fieldValue) {
    toast.info(`Campo ${fieldName} é obrigatório`);
  }
  return fieldValue;
};
