library(tidyverse)
library(rvest)
library(glue)

url <- 'https://cei.b3.com.br'
sessao <- html_session(url)

(form_login <- html_form(sessao))
  

form_preenchido <- set_values(form_login[[1]], 
                              'ctl00$ContentPlaceHolder1$txtLogin' = '09030345900',
                              'ctl00$ContentPlaceHolder1$txtSenha' = 'Destinydraw13@')

submit_form(sessao, form_preenchido)

url_dados <- glue('{url}/CEI_Responsivo/ConsultarCarteiraAtivos.aspx')

pagina_dados <- jump_to(sessao, url_dados)
(form_dados <- html_form(pagina_dados))

instituicoes <- read_html(pagina_dados) %>% 
  html_nodes('option') %>% 
  html_text()

#tirando o placeholder 'Selecione...'
instituicoes <- instituicoes[!grepl("Selecione", instituicoes)] 

instituicoes


dados_totais <- data.frame()
for(i in instituicoes) {
  #separando o c�digo do banco do nome
  banco <- str_split(i, ' - ', simplify = TRUE)
  numero <- banco[1]
  nome <- banco[2]
  #o formul�rio espera receber a sele��o do c�digo n�merico do banco
  form_dados_preenchidos <- set_values(form_dados[[1]], 
                                       'ctl00$ContentPlaceHolder1$ddlAgentes' = numero)
  
  #submetemos o formul�rio na mesma sess�o logada
  resultado <- submit_form(sessao, form_dados_preenchidos)
  
  #caso n�o tenha a��es, a mensagem ser� exibida
  nao_teve_resultado <- resultado %>%
    read_html() %>% 
    html_text() %>% 
    str_detect('N�o foram encontrados resultados para esta pesquisa')
  
  #caso a mensagem n�o apare�a
  if(!nao_teve_resultado) {
    dados_de_um_banco <- resultado %>% 
      html_nodes('#ctl00_ContentPlaceHolder1_rptAgenteContaMercado_ctl00_rptContaMercado_ctl00_rprCarteira_ctl00_trBodyCarteira') %>%
      html_node('table') %>%
      html_table() %>% 
      .[[1]] %>%
      .[-nrow(.),] #descartando a �ltima linha da tabela por ser um totalizador
    
    dados_de_um_banco$nome_banco <- nome #adicionado nome do banco no dataframe
    
    #bind dos dados de compra e venda de cada banco formando um dataframe total
    dados_totais <- bind_rows(dados_de_um_banco, dados_totais)
  }
}





