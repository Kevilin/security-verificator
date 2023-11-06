import * as vscode from 'vscode';
import * as fs from 'fs';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "security-verificator" is now active!');

    let disposable = vscode.commands.registerCommand('security-verificator.checarSeguranca', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();

            try {
                // Fazendo uma requisição POST para a API
                const response = await axios.post('https://chatgpt-api.kmr.dev.br/api/check', {
					origem: "teste",
					entrada: text
                });

                const mensagem = response.data.retorno;
                
                vscode.window.showInformationMessage(mensagem);
            } catch (error: any) {
                vscode.window.showErrorMessage('Erro ao fazer a requisição para a API: ' + error.message);
            }
        } else {
            vscode.window.showErrorMessage('Nenhum editor aberto para obter o conteúdo do arquivo.');
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}