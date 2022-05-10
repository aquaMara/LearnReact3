import './App.css';
import Index from './authorization/Index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/appuser/Account";
import Layout from './components/Layout';
import SubjectGrid from './components/subject/SubjectGrid';
import SectionGrid from './components/section/SectionGrid';
import ArticleGrid from "./components/article/ArticleGrid";
import Article from "./components/article/Article";
import EditArticle from "./components/article/EditArticle";
import CreateArticle from "./components/article/CreateArticle";
import Author from './components/appuser/Author';
import EditSubject from './components/admin/EditSubject';
import Subjects from './components/admin/Subjects';

import Login2 from './authorization/Login2';
import Registration2 from './authorization/Registration2';

import RequireAuth from './components/RequireAuth';

const ROLES = {
  "Teacher": "ROLE_STUDENT",
  "Student": "ROLE_TEACHER",
  "Admin": "ROLE_ADMIN"
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/register" element={<Registration2/>} />

        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT", "ROLE_TEACHER"]} /> }>
          <Route path="/home/" element={<Layout />}> 
            <Route index element={<SubjectGrid />} />
            <Route path="/home/subjects/:subjectId" element={<SectionGrid />} />
            <Route path="/home/sections/:sectionId" element={<ArticleGrid />} />
            <Route path="/home/articles/:articleId" element={<Article />} />
            <Route path="/home/articles/edit/:articleId" element={<EditArticle />} />
            <Route path="/home/articles/create" element={<CreateArticle />} />
            <Route path="/home/account/:username" element={<Account />} />
            <Route path="/home/author/:userId" element={<Author />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} /> }>
          <Route path="/admin/subjects" element={<Subjects />} />
          <Route path="/admin/subjects/:subjectId" element={<EditSubject />} />
        </Route>

        </Routes>
    </div>
  );
}

export default App;