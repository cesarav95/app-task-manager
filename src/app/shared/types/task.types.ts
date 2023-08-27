export interface TableColumn {
  field: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending'
}
