import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/home/dashboard/dashboard";
import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/register/register";
import { ProdutosListComponent } from "./pages/cadastros/produtos-list/produtos-list";
import { ProdutosFormComponent } from "./pages/cadastros/produtos-form/produtos-form";
import { ProdutosDetailsComponent } from "./pages/cadastros/produtos-details/produtos-details";
import { FornecedoresListComponent } from "./pages/cadastros/fornecedores-list/fornecedores-list";
import { FornecedoresFormComponent } from "./pages/cadastros/fornecedores-form/fornecedores-form";
import { FornecedoresDetailsComponent } from "./pages/cadastros/fornecedores-details/fornecedores-details";
import { EstoqueProdutoComponent } from "./pages/estoque/estoque-produto/estoque-produto";
import { MovimentacoesListComponent } from "./pages/estoque/movimentacoes-list/movimentacoes-list";
import { EntradaFormComponent } from "./pages/estoque/entrada-form/entrada-form";
import { SaidaFormComponent } from "./pages/estoque/saida-form/saida-form";
import { EstoqueListComponent } from "./pages/estoque/estoque-list/estoque-list";

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  // AUTH
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // CADASTROS
  { path: 'cadastros/produtos', component: ProdutosListComponent },
  { path: 'cadastros/produtos/novo', component: ProdutosFormComponent },
  { path: 'cadastros/produtos/:id', component: ProdutosDetailsComponent },

  { path: 'cadastros/fornecedores', component: FornecedoresListComponent },
  { path: 'cadastros/fornecedores/novo', component: FornecedoresFormComponent },
  { path: 'cadastros/fornecedores/:id', component: FornecedoresDetailsComponent },

  // ESTOQUE
  { path: 'estoque/lista', component: EstoqueListComponent },
  { path: 'estoque/produto/:id', component: EstoqueProdutoComponent },
  { path: 'estoque/movimentacoes', component: MovimentacoesListComponent },
  { path: 'estoque/entrada/:id', component: EntradaFormComponent },
  { path: 'estoque/saida/:id', component: SaidaFormComponent },
];
