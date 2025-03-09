import useToastStore from '@/stores/toastStore';
import ToastItem from './ToastItem';

interface Toast {}
export default function Toast({}: Toast) {
  const toastObjects = useToastStore((state) => state.toastObjects);

  if (toastObjects.length <= 0) return;
  return (
    <>
      {toastObjects.map((toastObj, index) => (
        <ToastItem toastObj={toastObj} index={index} key={index} />
      ))}
    </>
  );
}
