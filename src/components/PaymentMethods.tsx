// import React from 'react';
// import { CreditCard, GoalIcon as PaypalIcon, PlusCircle } from 'lucide-react';
// import { paymentMethods } from '../data';
//
// export function PaymentMethods() {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">Payment Methods</h2>
//         <button className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
//           <PlusCircle className="w-4 h-4" />
//           <span>Add New</span>
//         </button>
//       </div>
//
//       <div className="space-y-4">
//         {paymentMethods.map(method => (
//           <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center space-x-4">
//               {method.type === 'card' ? (
//                 <CreditCard className="w-6 h-6 text-gray-600" />
//               ) : (
//                 <PaypalIcon className="w-6 h-6 text-blue-600" />
//               )}
//               <div>
//                 {method.type === 'card' ? (
//                   <>
//                     <p className="font-medium">{method.brand} •••• {method.last4}</p>
//                     <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
//                   </>
//                 ) : (
//                   <>
//                     <p className="font-medium">PayPal</p>
//                     <p className="text-sm text-gray-500">{method.email}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//             <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }