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
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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

import UserForm from './forms/user-form';

interface QueryParams {
  perPage: number;
  currentPage: number;
  role: string;
  q: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  queryParams: QueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
  debouncedSearch: (q: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setQueryParams,
  total,
  queryParams,
  debouncedSearch,
}: DataTableProps<TData, TValue>) {
  const { currentPage } = queryParams;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchValue, setSearchValue] = useState(queryParams.q);

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    setQueryParams((prev) => {
      return { ...prev, q: '' };
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: Math.ceil(total / 5) });

    return (
      <>
        <Button
          disabled={currentPage === 1}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            setQueryParams((prev) => {
              return { ...prev, currentPage: currentPage - 1 };
            })
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageNumbers.map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
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
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            setQueryParams((prev) => {
              return { ...prev, currentPage: currentPage + 1 };
            })
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </>
    );
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="relative">
          <Input
            placeholder="Filter emails..."
            value={searchValue}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
          {searchValue && (
            <X
              className="absolute h-4 w-4 top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={clearSearch}
            />
          )}
        </div>
        <Select
          onValueChange={(value) => {
            setQueryParams((prev) => {
              return { ...prev, role: value === 'none' ? '' : value };
            });
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
