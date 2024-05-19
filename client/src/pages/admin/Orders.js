import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listAllOrders,
  listMyOrders,
  onOrderSearch,
  updateOrder,
} from "../../actions/orders";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { ORDER_STATUS, ROLES } from "../../constants/panelConstants";
import { showOrderModal } from "../../actions/orderModal";

function Orders() {
  const user = useSelector((state) => state.usersSignin.userInfo.user);

  const orderListUser = useSelector((state) => state.orderListUser);
  const modal = useSelector((state) => state.orderModal);

  const { orders, loading } = orderListUser;

  const dispatch = useDispatch();

  const [Limit, setLimit] = useState(4);
  const [Orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [status, setStatus] = useState();
  const [dateSort, setDateSort] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e, order) => {
    e.preventDefault();

    dispatch(showOrderModal(order));
  };

  useEffect(() => {
    if (user.role === ROLES.Admin) {
      dispatch(
        listAllOrders(Limit, { status: status }, { createdAt: dateSort })
      );
    } else {
      dispatch(listMyOrders());
    }
  }, [Limit, status, dateSort]);

  useEffect(() => {
    setOrders(orders);
  }, [orders]);

  useEffect(() => {
    console.log("isOpen", modal.isOpen);
  }, [modal]);

  useEffect(() => {
    console.log("modal", isModalOpen);
  }, [isModalOpen]);

  const searchHandler = (value) => {
    dispatch(onOrderSearch(value));
  };

  const onLoadMore = () => {
    setLimit(Limit + 4);
  };

  return (
    <div className="relative container grid px-6 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Orders
      </h1>
      {loading && <LoadingIndicator />}
      <div className="min-w-0 rounded-lg ring-0 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <div className="p-4">
          <form>
            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <input
                  onChange={(e) => searchHandler(e.target.value)}
                  type="search"
                  name="search"
                  placeholder="Search by Customer Name"
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                />
              </div>
              <div>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="Status" hidden>
                    Status
                  </option>
                  <option value={""}>All</option>
                  <option value={ORDER_STATUS.Pending}>
                    {ORDER_STATUS.Pending}
                  </option>
                  <option value={ORDER_STATUS.Processing}>
                    {ORDER_STATUS.Processing}
                  </option>
                  <option value={ORDER_STATUS.Delivered}>
                    {ORDER_STATUS.Delivered}
                  </option>
                  <option value={ORDER_STATUS.Shipped}>
                    {ORDER_STATUS.Shipped}
                  </option>
                  <option value={ORDER_STATUS.Cancelled}>
                    {ORDER_STATUS.Cancelled}
                  </option>
                </select>
              </div>
              <div>
                <select
                  onChange={(e) => setDateSort(e.target.value)}
                  className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option selected value={1}>
                    Ascending Date
                  </option>
                  <option value={-1}>Descending Date</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 dark:bg-gray-900">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">
                  <input id="selectAll" name="selectAll" type="checkbox" />
                </td>
                <td className="px-4 py-3">ID</td>
                <td className="px-4 py-3">ITEMS</td>
                <td className="px-4 py-3">DATE</td>
                <td className="px-4 py-3">CUSTOMER</td>
                <td className="px-4 py-3">AMOUNT</td>
                <td className="px-4 py-3">STATUS</td>

                <td className="px-4 py-3">INVOICE</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {orders?.map((order, index) => {
                let total = 0;
                order.orderItems?.map((item) => {
                  let itemPrice = parseFloat(item.price);
                  let itemTotal = itemPrice * parseFloat(item.quantity);

                  total = itemTotal + total;

                  return null;
                });

                return (
                  <tr>
                    <td className="px-4 py-3">
                      <input id="selectAll" name="selectAll" type="checkbox" />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold uppercase text-xs">
                        {order?.orderId}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="w-[155px] overflow-x-auto flex">
                        {order.orderItems.map((item) => {
                          return (
                            <img
                              className="w-12 h-12 mx-0.5 border-2 border-solid object-cover rounded-sm	inline-block"
                              src={item.image}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold uppercase text-xs">
                        {order.createdAt.substring(0, 10)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">
                        {order.user?.firstName}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {}
                      <span className="text-sm font-semibold">${total}</span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="font-serif">
                        <span
                          className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full  ${
                            (order.status == ORDER_STATUS.Pending &&
                              "bg-yellow-200 text-yellow-700") ||
                            (order.status == ORDER_STATUS.Processing &&
                              "bg-green-200 text-green-700") ||
                            (order.status == ORDER_STATUS.Shipped &&
                              "bg-blue-200 text-blue-700") ||
                            (order.status == ORDER_STATUS.Delivered &&
                              "bg-green-800 text-green-200")
                          } bg-green-100 dark:bg-green-800 dark:text-green-100`}
                        >
                          {order.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex">
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                        >
                          <p>
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline points="6 9 6 2 18 2 18 9"></polyline>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                              <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                          </p>
                        </button>
                        <span
                          onClick={(e) => handleOpenModal(e, order)}
                          className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                        >
                          <a href="#">
                            <p>
                              <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line
                                  x1="21"
                                  y1="21"
                                  x2="16.65"
                                  y2="16.65"
                                ></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                            </p>
                          </a>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {Orders.length >= Limit && (
            <div className="flex justify-center">
              <button onClick={onLoadMore}>load more</button>
            </div>
          )}

          {Orders?.length === 0 && (
            <div className="flex justify-center">
              <p className="text-3xl p-10 text-gray-400	">
                THERE IS NOTHING HERE YET!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
