"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  nombre: string;
  role: string;
  createdAt: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      if (!res.ok) {
        if (isMounted) setLoading(false);
        return;
      }

      const data = await res.json();
      if (isMounted) {
        setUsers(data);
        setLoading(false);
      }
    };

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (data: { email: string; password: string; nombre: string; role: string }) => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (res.ok) {
      setShowCreateModal(false);
      fetchUsers();
    }
  };

  const handleEdit = async (data: { email: string; nombre: string; role: string }) => {
    if (!editingUser) return;
    const res = await fetch(`/api/admin/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (res.ok) {
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleResetPassword = async (password: string) => {
    if (!resetPasswordUser) return;
    const res = await fetch(`/api/admin/users/${resetPasswordUser.id}/reset-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    if (res.ok) {
      setResetPasswordUser(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    const res = await fetch(`/api/admin/users/${deleteUser.id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setDeleteUser(null);
      fetchUsers();
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando usuarios...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Usuarios</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          Crear Usuario
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card overflow-hidden">
        <table className="table-base">
          <thead className="bg-gray-50">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Creado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="font-medium text-gray-900">{user.nombre}</td>
                <td className="text-gray-500">{user.email}</td>
                <td>
                  <span className={`badge ${
                    user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("es-CO")}
                </td>
                <td className="text-right space-x-2">
                  <button onClick={() => setEditingUser(user)} className="link">Editar</button>
                  <button onClick={() => setResetPasswordUser(user)} className="text-yellow-600 hover:text-yellow-800">Reset Password</button>
                  <button onClick={() => setDeleteUser(user)} className="text-red-600 hover:text-red-800">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{user.nombre}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className={`badge mt-1 ${
                  user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {user.role}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(user.createdAt).toLocaleDateString("es-CO")}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => setEditingUser(user)} className="link text-sm">Editar</button>
              <button onClick={() => setResetPasswordUser(user)} className="text-sm text-yellow-600 hover:text-yellow-800">Reset Password</button>
              <button onClick={() => setDeleteUser(user)} className="text-sm text-red-600 hover:text-red-800">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && <UserFormModal title="Crear Usuario" onSubmit={handleCreate} onClose={() => setShowCreateModal(false)} />}

      {/* Edit Modal */}
      {editingUser && (
        <UserFormModal
          title="Editar Usuario"
          initial={{ email: editingUser.email, nombre: editingUser.nombre, role: editingUser.role }}
          onSubmit={(data) => handleEdit({ email: data.email, nombre: data.nombre, role: data.role })}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Reset Password Modal */}
      {resetPasswordUser && <ResetPasswordModal onSubmit={handleResetPassword} onClose={() => setResetPasswordUser(null)} />}

      {/* Delete Confirmation */}
      {deleteUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eliminar Usuario</h3>
            <p className="text-sm text-gray-600 mb-4">
              ¿Estás seguro de eliminar a <strong>{deleteUser.nombre}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteUser(null)} className="btn btn-secondary">Cancelar</button>
              <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserFormModal({
  title,
  initial,
  onSubmit,
  onClose,
}: {
  title: string;
  initial?: { email: string; nombre: string; role: string };
  onSubmit: (data: { email: string; password: string; nombre: string; role: string }) => void;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [role, setRole] = useState(initial?.role || "user");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initial && !password) return;
    onSubmit({ email, password, nombre, role });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
          </div>
          <div>
            <label className="label">Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {!initial && (
            <div>
              <label className="label">Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResetPasswordModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (password: string) => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nueva Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
