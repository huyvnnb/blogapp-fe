// import { useEffect } from "react";
// import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
// import { useContext } from "react";
// import { useConfirm } from "./useConfirm";

// export function useConfirmLeave(hasUnsavedChanges: boolean) {
//   const navigator = useContext(UNSAFE_NavigationContext).navigator;
//   const navigate = useNavigate();
//   const {confirm} = useConfirm();

//   useEffect(() => {
//     if (!hasUnsavedChanges) return;

//     const push = navigator.push;

//     navigator.push = async (to: any, ...rest: any[]) => {
//       const ok = await confirm("Bạn có chắc chắn muốn rời khỏi trang? Mọi thay đổi chưa lưu sẽ bị mất.");

//       if (ok) {
//         navigator.push = push;
//         navigate(to, ...rest);
//       }
//     };

//     return () => {
//       navigator.push = push;
//     };
//   }, [hasUnsavedChanges, navigate, navigator]);
// }
