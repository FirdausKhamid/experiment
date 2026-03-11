import { render, screen, fireEvent } from '@testing-library/react';
import { ColumnDef } from '@tanstack/react-table';
import { TableComponent } from './TableComponent';

type Row = { id: number; name: string };

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

describe('TableComponent', () => {
  it('renders loading state', () => {
    render(
      <TableComponent
        data={[]}
        columns={columns}
        isLoading
        loadingMessage="Loading rows"
      />,
    );

    expect(screen.getByText('Loading rows')).toBeInTheDocument();
  });

  it('renders rows and calls onRowClick', () => {
    const onRowClick = jest.fn();
    const data: Row[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    render(
      <TableComponent
        data={data}
        columns={columns}
        onRowClick={onRowClick}
      />,
    );

    const aliceRowCell = screen.getByText('Alice');
    fireEvent.click(aliceRowCell.closest('tr')!);

    expect(onRowClick).toHaveBeenCalledWith({ id: 1, name: 'Alice' });
  });

  it('shows empty state when no rows', () => {
    render(<TableComponent data={[]} columns={columns} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });
});

