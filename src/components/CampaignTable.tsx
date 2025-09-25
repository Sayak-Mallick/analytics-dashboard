/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Play,
  Pause,
  Edit,
  Eye,
  MoreVertical
} from 'lucide-react';
import type { CampaignData } from '../types/dashboard';

interface CampaignTableProps {
  campaigns: CampaignData[];
  onToggleStatus: (id: string) => void;
  loading?: boolean;
}

const columnHelper = createColumnHelper<CampaignData>();

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onToggleStatus, loading }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'campaigns' | 'adGroups' | 'keywords' | 'ads'>('campaigns');

  const columns = useMemo<ColumnDef<CampaignData, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Campaign Name',
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {info.getValue()}
              </div>
              <div className="text-sm text-gray-500">
                {info.row.original.country}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('spend', {
        header: 'Spend',
        cell: (info) => (
          <div className="text-sm font-medium text-gray-900">
            ${info.getValue().toLocaleString()}
          </div>
        ),
      }),
      columnHelper.accessor('installs', {
        header: 'Installs',
        cell: (info) => (
          <div className="text-sm text-gray-900">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('conversions', {
        header: 'Conversions',
        cell: (info) => (
          <div className="text-sm text-gray-900">
            {info.getValue()}%
          </div>
        ),
      }),
      columnHelper.accessor('roas', {
        header: 'ROAS',
        cell: (info) => (
          <div className="text-sm font-medium text-gray-900">
            +{info.getValue()}%
          </div>
        ),
      }),
      columnHelper.accessor('change', {
        header: 'Change',
        cell: (info) => {
          const value = info.getValue();
          const isPositive = value > 0;
          return (
            <div className="flex items-center">
              <div className={`h-2 bg-orange-500 rounded mr-2`} style={{ width: `${Math.abs(value)}px` }}></div>
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{value}%
              </span>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleStatus(info.row.original.id)}
              className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                info.row.original.status === 'active' ? 'text-green-600' : 'text-gray-400'
              }`}
              title={info.row.original.status === 'active' ? 'Pause campaign' : 'Resume campaign'}
            >
              {info.row.original.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ],
    [onToggleStatus]
  );

  const table = useReactTable({
    data: campaigns,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const tabs = [
    { id: 'campaigns', label: 'Campaigns', count: campaigns.length },
    { id: 'adGroups', label: 'Ad Groups', count: 0 },
    { id: 'keywords', label: 'Keywords', count: 0 },
    { id: 'ads', label: 'Ads', count: 0 },
  ] as const;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      {/* Header with Tabs and Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      {{
                        asc: <ChevronUp className="h-4 w-4" />,
                        desc: <ChevronDown className="h-4 w-4" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{' '}
          of{' '}
          <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignTable;
