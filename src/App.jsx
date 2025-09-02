import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, PlusCircle, Users, Target, CheckCircle, BarChart2, UserPlus, Edit, Trash2, X, FilePlus, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

// --- DATOS DE EJEMPLO ---
const initialProfessors = [
  { id: 1, name: 'Dianys Paola Giraldo-Pérez', category: 'Investigador Junior', cvlac: '1001977152' },
  { id: 2, name: 'Damaris Sanchez Rojas', category: 'Investigador Junior', cvlac: '1143424133' },
  { id: 3, name: 'Andrés Estrada Echeverry', category: 'Investigador sin Categoría', cvlac: '72205731' },
  { id: 4, name: 'Camilo Barragán', category: 'Investigador Senior', cvlac: '' },
  { id: 5, name: 'Andrés Aguirre', category: 'Investigador sin Categoría', cvlac: '94552425' },
  { id: 6, name: 'Rosa Hernandez', category: 'Investigador Junior', cvlac: '22705075' },
  { id: 7, name: 'Octavio Giraldo Castro', category: 'Investigador sin Categoría', cvlac: '10085030' },
  { id: 8, name: 'Wendy Gonzales', category: 'Investigador Junior', cvlac: '1235241366' },
  { id: 9, name: 'Silvia Noguera', category: 'Investigador sin Categoría', cvlac: '32785239' },
  { id: 10, name: 'Carlos Rodríguez Arias', category: 'Investigador sin Categoría', cvlac: 'N/A' },
];
const productCategories = { GNC: 'GENERACIÓN DE NUEVO CONOCIMIENTO', DTI: 'DESARROLLO TECNOLÓGICO E INNOVACIÓN', ASC: 'APROPIACIÓN SOCIAL DEL CONOCIMIENTO', FTH: 'FORMACIÓN DE TALENTO HUMANO', POA: 'PRODUCTOS ADICIONALES SOLICITADOS EN POA', };
const initialWorkPlan = [
  { id: 1, professorId: 1, category: 'GNC', type: 'Someter Artículo Tipo TOP', meta: 1, achieved: 1 }, { id: 2, professorId: 1, category: 'GNC', type: 'PUBLICAR Libro de investigación', meta: 1, achieved: 0 }, { id: 3, professorId: 1, category: 'GNC', type: 'Someter Capítulo del libro', meta: 1, achieved: 1 }, { id: 4, professorId: 1, category: 'ASC', type: 'Ponencia Nacional o Internacional', meta: 1, achieved: 1 }, { id: 5, professorId: 1, category: 'FTH', type: 'Trabajos dirigidos/tutorías PREGRADO', meta: 4, achieved: 3 }, { id: 6, professorId: 1, category: 'POA', type: 'Categorización de Grupos e Investigadores', meta: 1, achieved: 1 }, { id: 7, professorId: 2, category: 'GNC', type: 'Someter Artículo Tipo TOP', meta: 1, achieved: 1 }, { id: 8, professorId: 2, category: 'FTH', type: 'Trabajos dirigidos/tutorías MAESTRÍA', meta: 2, achieved: 2 }, { id: 9, professorId: 2, category: 'POA', type: 'Redes de conocimiento', meta: 1, achieved: 1 }, { id: 10, professorId: 3, category: 'GNC', type: 'PUBLICAR Libro de investigación', meta: 1, achieved: 0 }, { id: 11, professorId: 3, category: 'DTI', type: 'Prototipo', meta: 1, achieved: 0 }, { id: 12, professorId: 3, category: 'POA', type: 'Proyectos de I+D+i', meta: 1, achieved: 1 }, { id: 13, professorId: 4, category: 'GNC', type: 'Someter Artículo Tipo TOP', meta: 1, achieved: 3 }, { id: 14, professorId: 4, category: 'GNC', type: 'PUBLICAR artículo', meta: 1, achieved: 1 }, { id: 15, professorId: 10, category: 'GNC', type: 'Someter Artículo Tipo TOP', meta: 1, achieved: 0 }, { id: 16, professorId: 10, category: 'DTI', type: 'Prototipo', meta: 1, achieved: 0 }, { id: 17, professorId: 10, category: 'ASC', type: 'Ponencia Nacional o Internacional', meta: 1, achieved: 0 },
];
const initialTasks = [
  { id: 1, planId: 1, title: 'Artículo sobre IA en finanzas', status: 'Aprobado', url: '', observations: 'Sometido a revista Q1', evidenceFile: 'articulo_IA.pdf', rejectionReason: null }, { id: 2, planId: 3, title: 'Transformación de las finanzas personales en la era digital - UMECIT', status: 'Aprobado', url: '', observations: 'Sometido, se espera publicación', evidenceFile: 'capitulo_libro_fintech.pdf', rejectionReason: null }, { id: 3, planId: 4, title: 'Ponencia en congreso CLADEA', status: 'Aprobado', url: '', observations: '', evidenceFile: 'certificado_CLADEA.pdf', rejectionReason: null }, { id: 4, planId: 5, title: 'Tutoría de pregrado 1', status: 'Aprobado', url: '', observations: '', evidenceFile: 'acta_tutoria_1.pdf', rejectionReason: null }, { id: 5, planId: 5, title: 'Tutoría de pregrado 2', status: 'Aprobado', url: '', observations: '', evidenceFile: 'acta_tutoria_2.pdf', rejectionReason: null }, { id: 6, planId: 5, title: 'Tutoría de pregrado 3', status: 'Aprobado', url: '', observations: '', evidenceFile: 'acta_tutoria_3.pdf', rejectionReason: null }, { id: 7, planId: 5, title: 'Tutoría de pregrado 4', status: 'Pendiente de Revisión', url: '', observations: '', evidenceFile: 'acta_tutoria_4.pdf', rejectionReason: null }, { id: 8, planId: 6, title: 'GRUPO CATEROGORÍA B / INVESTIGADOR JUNIOR', status: 'Aprobado', url: '', observations: '', evidenceFile: 'resolucion_minciencias.pdf', rejectionReason: null }, { id: 9, planId: 7, title: 'Design of a Deep Learning Model...', status: 'Aprobado', url: 'https://...', observations: 'Sometida y pasada por primera revisión', evidenceFile: 'evidencia_revision_articulo.pdf', rejectionReason: null }, { id: 10, planId: 8, title: 'Tesis de maestría sobre Logística 4.0', status: 'Rechazado', url: '', observations: 'Se necesita el acta de sustentación firmada.', evidenceFile: 'borrador_tesis.pdf', rejectionReason: 'El documento cargado es un borrador. Se requiere el acta de sustentación final para su aprobación.' },
];

// --- COMPONENTES ---
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminDashboard = ({ professors, workPlan, onSelectProfessor, onAddProfessor }) => {
  const totalGlobalMeta = workPlan.reduce((acc, curr) => acc + curr.meta, 0);
  const totalGlobalAchieved = workPlan.reduce((acc, curr) => acc + curr.achieved, 0);
  const globalProgress = totalGlobalMeta > 0 ? (totalGlobalAchieved / totalGlobalMeta) * 100 : 0;

  const summaryByProfessor = professors.map(p => {
    const professorPlan = workPlan.filter(wp => wp.professorId === p.id);
    const totalMeta = professorPlan.reduce((acc, curr) => acc + curr.meta, 0);
    const totalAchieved = professorPlan.reduce((acc, curr) => acc + curr.achieved, 0);
    const progress = totalMeta > 0 ? (totalAchieved / totalMeta) * 100 : 0;
    return { name: p.name, meta: totalMeta, logro: totalAchieved, avance: progress };
  });

  const profesoresVoluntariosNombres = ['Rosa Hernandez', 'Octavio Giraldo Castro', 'Wendy Gonzales', 'Silvia Noguera'];
  const profesoresConPlan = summaryByProfessor.filter(p => !profesoresVoluntariosNombres.includes(p.name));
  const profesoresVoluntarios = summaryByProfessor.filter(p => profesoresVoluntariosNombres.includes(p.name));

  const summaryByCategory = Object.keys(productCategories).map(key => {
      const categoryPlan = workPlan.filter(wp => wp.category === key);
      return {
          name: productCategories[key].split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' '),
          meta: categoryPlan.reduce((acc, curr) => acc + curr.meta, 0),
          logro: categoryPlan.reduce((acc, curr) => acc + curr.achieved, 0),
      }
  }).filter(c => c.meta > 0 || c.logro > 0);

  const summaryByType = workPlan.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { type: item.type, meta: 0, logro: 0 };
    }
    acc[item.type].meta += item.meta;
    acc[item.type].logro += item.achieved;
    return acc;
  }, {});
  const summaryByTypeList = Object.values(summaryByType);

  const renderProfessorTable = (professorsList, title) => (
    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-700">{title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100"><th>Profesor</th><th>Meta</th><th>Logro</th><th>Avance</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {professorsList.map((p, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-center">{p.meta}</td>
                  <td className="p-3 text-center">{p.logro}</td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${p.avance}%` }}></div>
                    </div>
                    <span className="text-sm">{p.avance.toFixed(1)}%</span>
                  </td>
                  <td className="p-3">
                    <button onClick={() => onSelectProfessor(professors.find(prof => prof.name === p.name))} className="text-blue-600 hover:underline">Ver Plan</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Vicerrectoría</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Profesores" value={professors.length} icon={<Users className="text-white" />} color="bg-blue-500" />
        <StatCard title="Total Metas POA" value={totalGlobalMeta} icon={<Target className="text-white" />} color="bg-yellow-500" />
        <StatCard title="Total Logros Aprobados" value={totalGlobalAchieved} icon={<CheckCircle className="text-white" />} color="bg-green-500" />
        <StatCard title="Avance General" value={`${globalProgress.toFixed(1)}%`} icon={<BarChart2 className="text-white" />} color="bg-purple-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Avance por Profesor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryByProfessor} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meta" fill="#8884d8" name="Meta" />
              <Bar dataKey="logro" fill="#82ca9d" name="Logro Aprobado" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
           <h3 className="font-bold text-lg mb-4 text-gray-700">Metas vs Logros por Categoría</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={summaryByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 150, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, width: 140 }} width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="meta" fill="#fca5a5" name="Meta" />
                    <Bar dataKey="logro" fill="#6ee7b7" name="Logro Aprobado" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            {renderProfessorTable(profesoresConPlan, "Profesores con Plan de Trabajo")}
            {renderProfessorTable(profesoresVoluntarios, "Profesores Voluntarios")}
             <button onClick={onAddProfessor} className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="mr-2 h-5 w-5" /> Añadir Profesor
              </button>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 text-gray-700">Detalle por Tipo de Producto</h3>
            <div className="overflow-auto h-96">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 sticky top-0"><th>Tipo de Producto</th><th>Meta</th><th>Logro</th></tr>
                    </thead>
                    <tbody>
                        {summaryByTypeList.map(item => (
                            <tr key={item.type} className="border-b hover:bg-gray-50">
                                <td className="p-2 text-sm">{item.type}</td>
                                <td className="p-2 text-center">{item.meta}</td>
                                <td className="p-2 text-center">{item.logro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

const TaskStatusBadge = ({ status }) => {
    const statusStyles = {
        'Aprobado': 'bg-green-100 text-green-800',
        'Pendiente de Revisión': 'bg-yellow-100 text-yellow-800',
        'Rechazado': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const WorkPlanView = ({ professor, workPlan, tasks, onBack, userRole, onAddTask, onAddPlanItem, onUpdatePlanItem, onDeletePlanItem, onApproveTask, onRejectTask }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  if (!professor) return null;

  const professorPlan = workPlan.filter(wp => wp.professorId === professor.id);
  const toggleCategory = (category) => setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  
  const totalMeta = professorPlan.reduce((acc, curr) => acc + curr.meta, 0);
  const totalAchieved = professorPlan.reduce((acc, curr) => acc + curr.achieved, 0);
  const progress = totalMeta > 0 ? (totalAchieved / totalMeta) * 100 : 0;
  
  const groupedPlan = professorPlan.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {userRole === 'admin' && <button onClick={onBack} className="text-blue-600 hover:underline mb-4">&larr; Volver al Dashboard</button>}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">{professor.name}</h2>
        <p className="text-gray-500">{professor.category}</p>
        <p className="text-gray-500">CVLAC ID: {professor.cvlac}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Meta Total" value={totalMeta} icon={<Target className="text-white" />} color="bg-yellow-500" />
        <StatCard title="Logros Aprobados" value={totalAchieved} icon={<CheckCircle className="text-white" />} color="bg-green-500" />
        <StatCard title="Avance" value={`${progress.toFixed(1)}%`} icon={<BarChart2 className="text-white" />} color="bg-purple-500" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Plan de Trabajo y Productos</h3>
          {userRole === 'admin' && (
            <button onClick={onAddPlanItem} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              <FilePlus className="mr-2 h-5 w-5" /> Añadir Meta
            </button>
          )}
        </div>
        {Object.keys(groupedPlan).length === 0 && <p className="text-gray-500 bg-white p-4 rounded-lg shadow-md">No hay metas asignadas.</p>}
        {Object.keys(groupedPlan).map(categoryKey => (
          <div key={categoryKey} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
            <button onClick={() => toggleCategory(categoryKey)} className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200">
              <h4 className="font-bold text-lg text-gray-700">{productCategories[categoryKey]}</h4>
              {expandedCategories[categoryKey] ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedCategories[categoryKey] && (
              <div className="p-4 space-y-4">
                {groupedPlan[categoryKey].map(planItem => {
                  const itemTasks = tasks.filter(t => t.planId === planItem.id);
                  return (
                    <div key={planItem.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800">{planItem.type}</p>
                          <p className="text-sm text-gray-500">Meta: {planItem.meta} | Aprobados: {planItem.achieved}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {userRole === 'professor' && (
                            <button onClick={() => onAddTask(planItem)} className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600">
                              <PlusCircle className="mr-1 h-4 w-4" /> Añadir Logro
                            </button>
                          )}
                          {userRole === 'admin' && (
                            <>
                              <button onClick={() => onUpdatePlanItem(planItem)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                              <button onClick={() => onDeletePlanItem(planItem.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                            </>
                          )}
                        </div>
                      </div>
                      {itemTasks.length > 0 && (
                        <div className="mt-2 space-y-3 pl-4 border-l-2 border-gray-200">
                          {itemTasks.map(task => (
                            <div key={task.id} className="p-3 bg-gray-50 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">{task.title}</p>
                                    <TaskStatusBadge status={task.status} />
                                </div>
                              <p className="text-sm"><span>URL:</span> {task.url ? <a href={task.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver Evidencia</a> : 'N/A'}</p>
                              <p className="text-sm"><span>Archivo:</span> {task.evidenceFile || 'N/A'}</p>
                              {task.observations && <p className="text-sm"><span>Obs:</span> {task.observations}</p>}
                              
                              {task.status === 'Rechazado' && (
                                <div className="mt-2 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
                                    <p className="font-bold flex items-center"><AlertTriangle size={16} className="mr-2"/> Motivo del Rechazo</p>
                                    <p className="text-sm">{task.rejectionReason}</p>
                                </div>
                              )}

                              {userRole === 'admin' && task.status === 'Pendiente de Revisión' && (
                                <div className="flex gap-2 mt-2 pt-2 border-t">
                                    <button onClick={() => onApproveTask(task.id)} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"><ThumbsUp size={16}/></button>
                                    <button onClick={() => onRejectTask(task)} className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"><ThumbsDown size={16}/></button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskModal = ({ isOpen, onClose, planItem, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [observations, setObservations] = useState('');
    const [evidenceFile, setEvidenceFile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setUrl('');
            setObservations('');
            setEvidenceFile(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = { 
            id: Date.now(), 
            planId: planItem.id, 
            title, 
            status: 'Pendiente de Revisión', 
            url, 
            observations,
            evidenceFile: evidenceFile ? evidenceFile.name : null,
            rejectionReason: null
        };
        onSubmit(taskData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Cargar Nuevo Logro</h2>
                    <button onClick={onClose}><X className="h-6 w-6 text-gray-500" /></button>
                </div>
                <p className="mb-4 text-gray-600">Para el producto: <span className="font-semibold">{planItem?.type}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título del Producto/Logro</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL de Evidencia (Opcional)</label>
                        <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cargar Evidencia (Archivo)</label>
                        <input type="file" onChange={e => setEvidenceFile(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                        <textarea value={observations} onChange={e => setObservations(e.target.value)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Enviar para Revisión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(reason);
        setReason('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Motivo del Rechazo</h2>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={reason} 
                        onChange={e => setReason(e.target.value)} 
                        rows="4" 
                        className="w-full border border-gray-300 rounded-md p-2" 
                        placeholder="Por favor, explique por qué se rechaza este logro..."
                        required
                    ></textarea>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">Confirmar Rechazo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PlanItemModal = ({ isOpen, onClose, onSubmit, planItemToEdit, professorId }) => {
    const [category, setCategory] = useState('GNC');
    const [type, setType] = useState('');
    const [meta, setMeta] = useState(1);
    useEffect(() => {
        if (isOpen) {
            if (planItemToEdit) { setCategory(planItemToEdit.category); setType(planItemToEdit.type); setMeta(planItemToEdit.meta); } 
            else { setCategory('GNC'); setType(''); setMeta(1); }
        }
    }, [planItemToEdit, isOpen]);
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        const planData = { id: planItemToEdit ? planItemToEdit.id : Date.now(), professorId, category, type, meta: Number(meta), achieved: planItemToEdit ? planItemToEdit.achieved : 0 };
        onSubmit(planData, !!planItemToEdit);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"><div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"><h2 className="text-2xl font-bold mb-4">{planItemToEdit ? 'Editar Meta' : 'Añadir Nueva Meta'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700">Categoría del Producto</label><select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">{Object.entries(productCategories).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}</select></div><div><label className="block text-sm font-medium text-gray-700">Tipo de Producto/Meta</label><input type="text" value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required /></div><div><label className="block text-sm font-medium text-gray-700">Cantidad (Meta)</label><input type="number" min="1" value={meta} onChange={e => setMeta(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required /></div><div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancelar</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{planItemToEdit ? 'Actualizar Meta' : 'Añadir Meta'}</button></div></form></div></div>
    );
};
const ProfessorModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Investigador sin Categoría');
    const [cvlac, setCvlac] = useState('');
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); onSubmit({ id: Date.now(), name, category, cvlac }); onClose(); };
    const handleClose = () => { setName(''); setCategory('Investigador sin Categoría'); setCvlac(''); onClose(); }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"><div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"><h2 className="text-2xl font-bold mb-4">Añadir Nuevo Profesor</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700">Nombre Completo</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required /></div><div><label className="block text-sm font-medium text-gray-700">Categoría Minciencias</label><select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"><option>Investigador Senior</option><option>Investigador Asociado</option><option>Investigador Junior</option><option>Investigador sin Categoría</option></select></div><div><label className="block text-sm font-medium text-gray-700">ID CvLAC</label><input type="text" value={cvlac} onChange={e => setCvlac(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" /></div><div className="flex justify-end gap-4"><button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancelar</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Añadir Profesor</button></div></form></div></div>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [userRole, setUserRole] = useState('admin');
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [professors, setProfessors] = useState(initialProfessors);
  const [workPlan, setWorkPlan] = useState(initialWorkPlan);
  const [tasks, setTasks] = useState(initialTasks);
  const [currentProfessorId, setCurrentProfessorId] = useState(initialProfessors.length > 0 ? initialProfessors[0].id : null);

  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isPlanItemModalOpen, setPlanItemModalOpen] = useState(false);
  const [isProfessorModalOpen, setProfessorModalOpen] = useState(false);
  const [isRejectionModalOpen, setRejectionModalOpen] = useState(false);

  const [currentPlanItem, setCurrentPlanItem] = useState(null);
  const [taskToReview, setTaskToReview] = useState(null);
  const [planItemToEdit, setPlanItemToEdit] = useState(null);
  
  const recalculateAchievements = (planId, currentTasks) => {
    const achievedCount = currentTasks.filter(t => t.planId === planId && t.status === 'Aprobado').length;
    setWorkPlan(prevPlan => prevPlan.map(p => p.id === planId ? { ...p, achieved: achievedCount } : p));
  };

  const handleSelectProfessor = (professor) => setSelectedProfessor(professor);
  const handleBack = () => setSelectedProfessor(null);

  const handleAddProfessor = (professorData) => {
    setProfessors(prev => [...prev, professorData]);
    setProfessorModalOpen(false);
  };

  const handleOpenAddPlanItemModal = () => { setPlanItemToEdit(null); setPlanItemModalOpen(true); };
  const handleOpenUpdatePlanItemModal = (planItem) => { setPlanItemToEdit(planItem); setPlanItemModalOpen(true); };
  const handlePlanItemSubmit = (planData, isEdit) => {
    if (isEdit) { setWorkPlan(workPlan.map(p => p.id === planData.id ? planData : p)); } 
    else { setWorkPlan([...workPlan, planData]); }
    setPlanItemModalOpen(false);
  };
  const handleDeletePlanItem = (planItemId) => {
    if (window.confirm('¿Seguro que quieres eliminar esta meta? Se eliminarán los logros asociados.')) {
      setWorkPlan(workPlan.filter(p => p.id !== planItemId));
      setTasks(tasks.filter(t => t.planId !== planItemId));
    }
  };

  const handleOpenAddTaskModal = (planItem) => { setCurrentPlanItem(planItem); setTaskModalOpen(true); };
  const handleTaskSubmit = (taskData) => {
    const newTasks = [...tasks, taskData];
    setTasks(newTasks);
  };

  const handleApproveTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: 'Aprobado' } : t);
    setTasks(updatedTasks);
    recalculateAchievements(task.planId, updatedTasks);
  };
  
  const handleOpenRejectModal = (task) => {
    setTaskToReview(task);
    setRejectionModalOpen(true);
  };
  
  const handleRejectTask = (reason) => {
    if (!taskToReview) return;
    const updatedTasks = tasks.map(t => t.id === taskToReview.id ? { ...t, status: 'Rechazado', rejectionReason: reason } : t);
    setTasks(updatedTasks);
    recalculateAchievements(taskToReview.planId, updatedTasks);
  };
  
  const renderContent = () => {
    if (userRole === 'admin') {
        if (selectedProfessor) {
            return <WorkPlanView 
                professor={selectedProfessor} workPlan={workPlan} tasks={tasks} onBack={handleBack} userRole={userRole}
                onAddPlanItem={handleOpenAddPlanItemModal} onUpdatePlanItem={handleOpenUpdatePlanItemModal} onDeletePlanItem={handleDeletePlanItem}
                onApproveTask={handleApproveTask} onRejectTask={handleOpenRejectModal}
            />;
        }
        return <AdminDashboard 
            professors={professors} workPlan={workPlan} onSelectProfessor={handleSelectProfessor} onAddProfessor={() => setProfessorModalOpen(true)}
        />;
    }
    
    if (userRole === 'professor') {
        if (!currentProfessorId) return <p className="text-center text-gray-500">No hay profesores para mostrar.</p>;
        const professor = professors.find(p => p.id === currentProfessorId);
        if (!professor) return <p className="text-center text-gray-500">Profesor no encontrado.</p>;
        return <WorkPlanView 
            professor={professor} workPlan={workPlan} tasks={tasks} onBack={() => {}} userRole={userRole}
            onAddTask={handleOpenAddTaskModal}
        />;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow p-4 text-xl font-bold text-gray-800">
        Plataforma de seguimiento grupo INVENTIA
      </header>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h1 className="text-2xl font-bold text-gray-800">Seguimiento POA Investigación</h1>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">Vista como:</span>
            <select value={userRole} onChange={(e) => {setUserRole(e.target.value); setSelectedProfessor(null);}} className="bg-white border border-gray-300 rounded-md p-2">
              <option value="admin">Vicerrectoría (Admin)</option>
              <option value="professor">Profesor</option>
            </select>
          </div>
          {userRole === 'professor' && (
            <div className="flex items-center ml-4">
              <span className="mr-4 text-gray-600">Profesor:</span>
              <select 
                value={currentProfessorId || ''} 
                onChange={(e) => setCurrentProfessorId(Number(e.target.value))} 
                className="bg-white border border-gray-300 rounded-md p-2 w-48"
              >
                {professors.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>
      <main className="p-4 md:p-8">
        {renderContent()}
      </main>
      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setTaskModalOpen(false)}
        planItem={currentPlanItem}
        onSubmit={handleTaskSubmit}
      />
      <PlanItemModal
        isOpen={isPlanItemModalOpen}
        onClose={() => setPlanItemModalOpen(false)}
        onSubmit={handlePlanItemSubmit}
        planItemToEdit={planItemToEdit}
        professorId={selectedProfessor?.id}
      />
      <ProfessorModal
        isOpen={isProfessorModalOpen}
        onClose={() => setProfessorModalOpen(false)}
        onSubmit={handleAddProfessor}
      />
      <RejectionModal
        isOpen={isRejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        onSubmit={handleRejectTask}
      />
    </div>
  );
}