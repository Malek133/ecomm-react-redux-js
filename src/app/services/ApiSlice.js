import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../srvices/CookiesService'

export const apiSlice = createApi({
    'reducerPath':'api',
    tagTypes:['Products'],
    refetchOnReconnect:true,
    refetchOnMountOrArgChange:true,
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_SERVER_URL}),
    endpoints:(build) =>({
        getDashboardProducts:build.query({
            query:(arg) =>{
              const {page}= arg;
              return {
                url:`/api/products?populate=categories,thumbnail&pagination[page]=${page}&pagination[pageSize]=11`
              }
            },
            providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Products' , id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
        }),
        deleteDashboardProducts:build.mutation({
            query(id){
              return {
                url:`/api/products/${id}`,
                method:'DELETE',
                headers:{
                  Authorization:`Bearer ${CookiesService.get('jwt')}`
                }
              }
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        })
    })

})

export const {useGetDashboardProductsQuery,useDeleteDashboardProductsMutation} = apiSlice