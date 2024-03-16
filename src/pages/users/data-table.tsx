import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import UserForm from './forms/user-form';

interface QueryParams {
  perPage: number;
  currentPage: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: User[];
  total: number;
  queryParams: QueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setQueryParams,
  total,
  queryParams,
}: DataTableProps<TData, TValue>) {
  const { currentPage, perPage } = queryParams;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const umap = total / perPage;
  // const array = Array.from({ length: Math.round(total / perPage) });
  // console.log('umap', total, perPage);
  // console.log('umap', Math.ceil(total / perPage));

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: Math.ceil(total / perPage) });

    return (
      <>
        <Button
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          onClick={() =>
            setQueryParams((prev) => {
              return { ...prev, currentPage: currentPage - 1 };
            })
          }
        >
          Prev
        </Button>
        {pageNumbers.map((_, i) => (
          <Button
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              setQueryParams((prev) => {
                return { ...prev, currentPage: i + 1 };
              })
            }
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === pageNumbers.length}
          variant="outline"
          size="sm"
          onClick={() =>
            setQueryParams((prev) => {
              return { ...prev, currentPage: currentPage + 1 };
            })
          }
        >
          Next
        </Button>
      </>
    );
  };

  // const renderPageNumbers = () => {
  //   const pageNumbers = Array.from({ length: Math.ceil(total / perPage) });

  //   return (
  //     <Pagination className="flex justify-end items-center">
  //       <PaginationContent>
  //         <PaginationItem
  //           onClick={() =>
  //             setQueryParams((prev) => {
  //               return { ...prev, currentPage: currentPage - 1 };
  //             })
  //           }
  //         >
  //           <Button>Previous</Button>
  //         </PaginationItem>
  //         {pageNumbers.map((_, i) => (
  //           <>
  //             <PaginationItem
  //               onClick={() =>
  //                 setQueryParams((prev) => {
  //                   return { ...prev, currentPage: i + 1 };
  //                 })
  //               }
  //             >
  //               <PaginationLink href="#" isActive={currentPage === i + 1}>
  //                 {i + 1}
  //               </PaginationLink>
  //             </PaginationItem>
  //             {/* <PaginationItem>
  //               <PaginationEllipsis />
  //             </PaginationItem> */}
  //           </>
  //         ))}
  //         <PaginationItem
  //           onClick={() =>
  //             setQueryParams((prev) => {
  //               return { ...prev, currentPage: currentPage + 1 };
  //             })
  //           }
  //         >
  //           <PaginationNext href="#" />
  //         </PaginationItem>
  //       </PaginationContent>
  //     </Pagination>
  //   );

  //   // return pageNumbers.map((_, i) => (

  //   // ));
  // };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* <Input
          placeholder="Filter role..."
          value={(table.getColumn('role')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('role')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <Select
          onValueChange={(value) => {
            if (value === 'none') {
              table.getColumn('role')?.setFilterValue('');
            } else {
              table.getColumn('role')?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="w-[140px] h-9 ml-2">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px] h-9 ml-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ban">Ban</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2" size="sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User form */}
        <UserForm />
      </div>
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
      <div className="py-4 flex justify-end items-center gap-x-3">
        {renderPageNumbers()}
      </div>
    </div>
  );
}
