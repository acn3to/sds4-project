# Semana Spring React - SDS 4.0
### sds4-project

### Sobre o projeto

Projeto organizado pela DevSuperior com o título de `Semana Spring React - SDS 4.0`. As informações abaixo foram retiradas do repositório do próprio projeto, a fim de serem utilizadas como futuro suporte.

 # Semana Spring React - Episódio 1

Objetivos do projeto para esta aula
- Criar projetos backend e frontend
- Salvar os projeto no Github em monorepo
- Montar o visual estático do front end
- Publicar o front end no Netlify

## Checklist

### Passo 0: preparação

- Dica: extensões do VS Code
- Criar pastas do projeto

![pastas-sds3](https://user-images.githubusercontent.com/22635013/132451957-e707d104-f960-4b99-b267-b887003b2bbc.png)

- Conferir Yarn

```bash
yarn -v
npm install --global yarn
```
### Passo 1: criar projetos

- Criar projeto ReactJS com create-react-app:

```bash
npx create-react-app frontend --template typescript
```
- *Lembrete: excluir repositório Git do projeto ReactJS*

- Criar projeto Spring Boot no `Spring Initializr` com as seguintes dependências:

  - Web
  - JPA
  - H2
  - Postgres
  - Security

- Se tiver com erro no pom.xml, tentar:
  - Botão direito no projeto -> Maven -> Update project (force update)
  - Menu Project -> Clean
  - Apagar pasta .m2 e deixar o STS refazer o download

 - **COMMIT: Project created**
 
 - *Lembrete: ver extensões e arquivos ocultos*

- Salvar o projeto no seu Github

```bash
git config --global user.name <seu nome>
git config --global user.email <seu email>

git init

git add .

git commit -m "Project created"

git remote add origin <seu endereço>

git push -u origin main
```
**Passo 2: "limpar" o projeto ReactJS**
- Limpar projeto ReactJS / tsconfig.json
- Arquivo _redirects

```basch
/* /index.html 200
```

- **COMMIT: Project clean**

**Passo 3: adicionar Bootstrap e CSS ao projeto**
- Bootstrap

```bash
yarn add bootstrap
```

```bash
(index.tsx) import 'bootstrap/dist/css/bootstrap.css';
```
- Assets e CSS

```bash
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
:root {
    --color-primary: #FF8400;
}

html, body {
    height: 100%;
    font-family: "Ubuntu", sans-serif;
}

#root {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.content {
    flex: 1 0 auto;
}

.footer {
    flex-shrink: 0;
    text-align: center;
}

.bg-primary {
    background-color: var(--color-primary) !important;
}

.text-primary {
    color: var(--color-primary) !important;
}
```

```bash
(index.tsx) import 'assets/css/styles.css';
```
- **COMMIT: Bootstrap**

**Passo 4: adicionar componentes estáticos básicos**

- Navbar

```bash
<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
  <div className="container">
    <nav className="my-2 my-md-0 mr-md-3">
      <img src={ImgDsDark} alt="DevSuperior" width="120" />
    </nav>
  </div>
</div>
```

- Footer

```bash
<footer className="footer mt-auto py-3 bg-dark">
  <div className="container">
    <p className="text-light">App desenvolvido por <a href="https://github.com/acenelio" target="_blank" rel="noreferrer">Nelio Alves</a></p>
    <p className="text-light"><small><strong>Semana Spring React</strong><br/>
      Evento promovido pela escola DevSuperior: <a href="https://instagram.com/devsuperior.ig" target="_blank" rel="noreferrer">@devsuperior.ig</a></small></p>
  </div>
</footer>
```

- DataTable

```bash
<div className="table-responsive">
    <table className="table table-striped table-sm">
        <thead>
            <tr>
                <th>Data</th>
                <th>Vendedor</th>
                <th>Clientes visitados</th>
                <th>Negócios fechados</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>22/04/2021</td>
                <td>Barry Allen</td>
                <td>34</td>
                <td>25</td>
                <td>15017.00</td>
            </tr>
        </tbody>
    </table>
</div>
```

- **COMMIT: Basic static components**

**Passo 5: adicionar gráficos estáticos**

- Apex Charts

```bash
yarn add apexcharts
yarn add react-apexcharts
```

- BarChart

```bash
const options = {
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
};

const mockData = {
    labels: {
        categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    },
    series: [
        {
            name: "% Sucesso",
            data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
        }
    ]
};
```

- DonutChart

```bash
const mockData = {
    series: [477138, 499928, 444867, 220426, 473088],
    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
}

const options = {
    legend: {
        show: true
    }
}
```

- **COMMIT: Static charts**

**Passo 6: implantação no Netlify**

- Deploy básico

  - Base directory: frontend
  - Build command: yarn build
  - Publish directory: frontend/build
 
 - Configurações adicionais

  - Site settings -> Domain Management: (colocar o nome que você quiser)
  - Deploys -> Trigger deploy

  
  # Semana Spring React - Episódio 2

## Objetivos do projeto para esta aula

- Implementar o back end

    - Modelo de domínio
    - Estruturar o back end no padrão camadas
    - Consulta paginada de vendas
    - Consultas agrupadas para gráficos
    - Implantação na nuvem

## Checklist

**Entendendo o modelo de dados**

### Passo 1: configuração de segurança

> O CORS (Cross-origin Resource Sharing) é um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens. O CORS é uma especificação do W3C e faz uso de headers do HTTP para informar aos navegadores se determinado recurso pode ser ou não acessado.
É um recurso que protege a nossa aplicação de ser acessada por uma outra aplicação que esteja em um outro domínio.

> Uma aplicação que está hospedada em determinado domínio não deve acessar a um backend de uma aplicação em outro domínio. No nosso caso temos que permitir que isso aconteça, uma vez que iremos implementar o backend no Heroku e o frontend no Netlify, o que representam domínios diferentes e neste caso precisamos que a nossa aplicação no Netlify consiga acessar o backend do Heroku. Para isso iremos fazer uma configuração no backend para permitir esse CORS.

```bash
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}
		
		http.cors().and().csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeRequests().anyRequest().permitAll();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
```
- **COMMIT: Security config**



### Passo 2: criar as entidades e o seed do banco

https://github.com/devsuperior/sds4/raw/main/_assets/dados.xlsx

Iniciando o trabalho com o modelo de dados, iremos usar o ficheiro de template disponibilizado pelo Prof. Nélio, de forma a podermos comparar os resultados devolvidos pela aplicação com os valores do ficheiro.

Modelo conceitual

![sds3-mc](https://user-images.githubusercontent.com/22635013/132658636-01831d53-0320-40b0-bf46-445cd5c9f2ae.png)

application.properties

```bash
spring.jpa.open-in-view=false

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

**Seed do banco de dados**

```bash
INSERT INTO tb_sellers(name) VALUES ('Logan');
INSERT INTO tb_sellers(name) VALUES ('Anakin');
INSERT INTO tb_sellers(name) VALUES ('BarryAllen');
INSERT INTO tb_sellers(name) VALUES ('Kal-El');
INSERT INTO tb_sellers(name) VALUES ('Padme');

INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,83,66,5501.0,'2021-04-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,113,78,8290.0,'2021-03-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,36,12,6096.0,'2021-03-30');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,42,22,3223.0,'2021-03-27');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,38,12,15017.0,'2021-03-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,88,52,20899.0,'2021-03-21');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,95,66,12383.0,'2021-03-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,117,78,10748.0,'2021-03-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,114,71,22274.0,'2021-03-15');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,127,96,19284.0,'2021-03-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,44,13,6871.0,'2021-03-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,49,25,9034.0,'2021-03-05');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,105,84,8114.0,'2021-03-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,94,65,21628.0,'2021-03-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,97,46,21707.0,'2021-02-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,104,71,12652.0,'2021-02-10');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,76,14,19349.0,'2021-02-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,154,78,21216.0,'2021-02-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,133,88,12561.0,'2021-02-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,50,31,15963.0,'2021-01-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,137,70,19349.0,'2021-01-25');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,53,33,9103.0,'2021-01-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,184,93,12927.0,'2021-01-10');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,35,12,6537.0,'2021-01-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,93,55,19890.0,'2021-01-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,168,92,6299.0,'2020-12-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,48,13,22411.0,'2020-12-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,107,67,9788.0,'2020-12-24');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,106,62,18942.0,'2020-12-20');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,40,26,11731.0,'2020-12-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,101,68,19882.0,'2020-12-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,185,100,14618.0,'2020-12-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,82,47,7951.0,'2020-12-15');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,86,45,4147.0,'2020-12-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,95,88,12943.0,'2020-12-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,75,58,18747.0,'2020-12-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,96,50,12624.0,'2020-12-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,79,40,14770.0,'2020-11-21');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,73,46,14124.0,'2020-11-20');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,92,58,20953.0,'2020-11-20');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,43,30,9690.0,'2020-11-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,58,30,11396.0,'2020-11-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,49,14,5119.0,'2020-11-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,53,23,8206.0,'2020-11-12');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,49,25,8269.0,'2020-11-10');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,53,29,17984.0,'2020-11-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,43,26,3056.0,'2020-11-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,51,21,8624.0,'2020-11-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,64,41,10959.0,'2020-11-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,75,23,15883.0,'2020-10-30');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,51,44,14038.0,'2020-10-27');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,141,81,13535.0,'2020-10-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,135,98,17241.0,'2020-10-25');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,116,66,16415.0,'2020-10-19');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,60,44,5329.0,'2020-10-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,63,32,16618.0,'2020-10-07');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,176,100,5062.0,'2020-10-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,118,45,22235.0,'2020-09-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,150,97,14484.0,'2020-09-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,115,63,18081.0,'2020-09-24');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,159,88,16101.0,'2020-09-23');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,76,45,11150.0,'2020-09-22');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,65,63,17982.0,'2020-09-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,90,68,15927.0,'2020-09-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,22,12,9793.0,'2020-09-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,19,11,4185.0,'2020-09-05');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,68,21,15541.0,'2020-09-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,64,47,7287.0,'2020-09-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,153,92,17913.0,'2020-09-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,93,53,12648.0,'2020-09-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,78,32,12021.0,'2020-08-30');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,94,49,18787.0,'2020-08-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,54,28,3974.0,'2020-08-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,45,25,5681.0,'2020-08-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,11,1,4008.0,'2020-08-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,118,80,5218.0,'2020-08-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,52,21,21220.0,'2020-08-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,127,23,8831.0,'2020-08-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,78,23,13900.0,'2020-08-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,102,52,22086.0,'2020-08-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,54,53,15731.0,'2020-07-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,173,93,10816.0,'2020-07-22');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,60,45,17633.0,'2020-07-20');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,138,72,14528.0,'2020-07-19');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,147,96,21582.0,'2020-07-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,32,12,9751.0,'2020-07-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,83,59,8496.0,'2020-07-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,58,48,5283.0,'2020-07-07');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,55,35,20474.0,'2020-07-05');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,84,34,5787.0,'2020-07-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,79,68,11976.0,'2020-06-27');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,121,67,18196.0,'2020-06-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,26,14,4255.0,'2020-06-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,55,42,13249.0,'2020-06-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,73,65,20751.0,'2020-06-10');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,47,25,7318.0,'2020-06-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,72,60,15608.0,'2020-06-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,97,68,8901.0,'2020-06-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,68,26,13231.0,'2020-06-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,73,53,19476.0,'2020-05-22');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,28,23,20530.0,'2020-05-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,83,44,4864.0,'2020-05-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,82,43,21753.0,'2020-05-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,43,26,7362.0,'2020-05-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,54,23,10549.0,'2020-04-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,125,84,13333.0,'2020-04-25');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,44,26,7431.0,'2020-04-23');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,46,25,21099.0,'2020-04-19');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,42,28,7217.0,'2020-04-19');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,52,21,10107.0,'2020-04-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,121,90,18174.0,'2020-04-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,65,14,8095.0,'2020-04-12');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,107,74,11507.0,'2020-04-12');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,140,74,11709.0,'2020-04-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,95,91,8288.0,'2020-04-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,68,43,17016.0,'2020-04-07');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,21,20,17126.0,'2020-04-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,38,15,7957.0,'2020-03-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,53,29,20903.0,'2020-03-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,19,10,3987.0,'2020-03-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,78,34,20795.0,'2020-03-27');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,83,44,4938.0,'2020-03-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,32,12,6926.0,'2020-03-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,64,33,8193.0,'2020-03-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,39,39,10557.0,'2020-03-05');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,158,84,21601.0,'2020-03-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,12,6,7625.0,'2020-02-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,82,82,22465.0,'2020-02-27');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,68,56,12595.0,'2020-02-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,27,13,4636.0,'2020-02-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,52,33,10155.0,'2020-02-14');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,142,81,13610.0,'2020-02-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,81,45,15306.0,'2020-02-08');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,64,35,17460.0,'2020-02-07');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,48,24,21413.0,'2020-02-03');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,150,82,6505.0,'2020-01-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,138,95,7983.0,'2020-01-18');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,70,48,9564.0,'2020-01-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,162,84,7302.0,'2020-01-15');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,57,54,9126.0,'2020-01-12');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,78,60,5253.0,'2020-01-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,81,53,11553.0,'2020-01-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,90,34,16020.0,'2019-12-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,57,39,10253.0,'2019-12-28');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,90,53,14398.0,'2019-12-21');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,30,25,16429.0,'2019-12-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,58,21,5368.0,'2019-12-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,79,12,9928.0,'2019-12-13');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,98,77,8860.0,'2019-12-12');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,100,69,13335.0,'2019-12-09');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,41,21,7009.0,'2019-12-06');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,141,78,6100.0,'2019-12-04');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,52,36,7050.0,'2019-12-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,76,51,21591.0,'2019-12-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,38,35,19416.0,'2019-11-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,54,12,9400.0,'2019-11-26');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,43,25,4854.0,'2019-11-23');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (4,70,51,10740.0,'2019-11-21');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,84,78,6990.0,'2019-11-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,126,94,14183.0,'2019-11-17');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,89,89,17044.0,'2019-11-02');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,149,83,20988.0,'2019-11-01');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,139,76,7682.0,'2019-10-31');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,39,14,7996.0,'2019-10-29');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,44,25,5546.0,'2019-10-24');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (5,127,92,12347.0,'2019-10-23');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,53,35,16423.0,'2019-10-20');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (1,14,8,7705.0,'2019-10-16');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (2,71,18,6436.0,'2019-10-07');
INSERT INTO tb_sales(seller_id,visited,deals,amount,date) VALUES (3,78,60,6723.0,'2019-10-07');
```

- **COMMIT: Domain model, database seed**

### Passo 3: Estruturar o projeto em camadas

**Padrão camadas adotado**

![camadas](https://user-images.githubusercontent.com/22635013/132674131-279a89c7-8ca4-4a47-a0d4-49657da0eefd.png)

- Criar repositories
- Criar DTO's
- Criar service
- Criar controller
- **COMMIT: Layers**

### Passo 4: Busca paginada de vendas

- Pageable
- page, size, sort
- Evitando interações repetid
- **COMMIT: Pagination**

### Passo 5: Buscas agrupadas (GROUP BY)

- Total de vendas por vendedor
- Taxa de sucesso por vendedor
- **COMMIT: Group by search**

### Passo 6: Validação no Postgres local

- Criar três perfis de projeto: test, dev, prod
- Gerar script SQL no perfil dev
- Testar projeto no banco Postgres local

**application.properties**

```bash
spring.profiles.active=test

spring.jpa.open-in-view=false
```

**application-dev.properties**

```bash
#spring.jpa.properties.javax.persistence.schema-generation.create-source=metadata
#spring.jpa.properties.javax.persistence.schema-generation.scripts.action=create
#spring.jpa.properties.javax.persistence.schema-generation.scripts.create-target=create.sql
#spring.jpa.properties.hibernate.hbm2ddl.delimiter=;

spring.datasource.url=jdbc:postgresql://localhost:5432/dsvendas
spring.datasource.username=postgres
spring.datasource.password=1234567

spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.hibernate.ddl-auto=none
```
**application-prod.properties**

```bash
spring.datasource.url=${DATABASE_URL}
```
**application.properties**

```bash
spring.profiles.active=${APP_PROFILE:test}

spring.jpa.open-in-view=false
```
**system.properties**

```bash
java.runtime.version=11
```

- **COMMIT: First homolog**

### Passo 7: Implantação no Heroku

- Criar app no Heroku
- Provisionar banco Postgres
- Definir variável APP_PROFILE=prod
- Conectar ao banco via pgAdmin
- Criar seed do banco

```bash
heroku -v
heroku login
heroku git:remote -a <nome-do-app>
git remote -v
git subtree push --prefix backend heroku main
```

  # Semana Spring React - Episódio 3

## Objetivos do projeto para esta aula

- Integrar back end e front end
- Três pilares do React
    - Componentes
    - Props
    - Estado
- React Hooks
    - useState
    - useEffect
- Libs
    - React Router DOM
    - Axios

## Checklist

### Passo 1: Rotas

- Instalar React Router DOM

```bash
yarn add react-router-dom

yarn add @types/react-router-dom -D
```

- Criar páginas Home e Dashboard
- Criar arquivo de rotas `Routes.tsx`
- **COMMIT: Routes**

### Passo 2: Página Home e navegações

```bash
<div className="container">
    <div className="jumbotron">
        <h1 className="display-4">DSVendas</h1>
        <p className="lead">Analise o desempenho das suas vendas por diferentes perspectivas</p>
        <hr/>
        <p>Esta aplicação consiste em exibir um dashboard a partir de dados fornecidos por um back end construído com Spring Boot.</p>
    </div>
</div>
```

- Fazer um link na Home para Dashboard
- Fazer um link na NavBar para Home
- **COMMIT: Home, navigation**

### Passo 3: First request

- Instalar Axios

```bash
yarn add axios
```

- Definir BASE_URL
- Definir tipo SaleSum
- Definir tipo local ChartData em DonutChart
- Fazer a requisição e tratar os dados
- **COMMIT: First request**

### Passo 4: DonutChart integration

```bash
Hook: useState
Manter estado no componente
```
```bash
Hook: useEffect
Executar algo na instanciação ou destruição do componente, observar estado
```

- **COMMIT: DonutChart integration**

### Passo 5: BarChart integration

- Definir função auxiliar round:

```bash
export const round = (value: number, precision: number) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
```

- Definir tipo SaleSuccess
- Definir tipo local ChartData em BarChart
- **COMMIT: BarChart integration**

### Passo 6: DataTable integration

- Instalar date-fns ao projeto

```bash
yarn add date-fns
```
- Criar tipos Seller, Sale, SalePage
- Criar função auxiliar formatLocalDate

```bash
export const formatLocalDate = (date: string, pattern: string) => {
    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, pattern);
}
```

- **COMMIT: DataTable integration**

### Passo 7: Pagination

```bash
Props
Argumentos que um componente React pode receber
```

- Criar componente Pagination

```bash
<div className="row d-flex justify-content-center">
    <nav>
        <ul className="pagination">
            <li className="page-item">
                <button className="page-link">Anterior</button>
            </li>
            <li className="page-item disabled">
                <span className="page-link">1</span>
            </li>
            <li className="page-item disabled">
                <button className="page-link">Próxima</button>
            </li>
        </ul>
    </nav>
</div>
```
- **COMMIT: Pagination**

### Projeto Final

https://dsvendas-costaneto.netlify.app/

# Autor

Arnaldo Costa Neto

# LinkedIn

https://www.linkedin.com/in/arnaldo-n3to/

