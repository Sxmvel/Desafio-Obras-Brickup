package com.samueldesenvolvedor.obras_api.dto;

public class ProgressoObraDTO {
    
    private Long obraId;
    private String nomeObra;
    private int totalEtapas;
    private int etapasConcluidas;
    private double percentualConcluido;

    // Construtor com todos os campos
    public ProgressoObraDTO(Long obraId, String nomeObra, int totalEtapas, int etapasConcluidas, double percentualConcluido) {
        this.obraId = obraId;
        this.nomeObra = nomeObra;
        this.totalEtapas = totalEtapas;
        this.etapasConcluidas = etapasConcluidas;
        this.percentualConcluido = percentualConcluido;
    }

    public ProgressoObraDTO(int etapasConcluidas, int totalEtapas) {
        this.etapasConcluidas = etapasConcluidas;
        this.totalEtapas = totalEtapas;
        this.percentualConcluido = totalEtapas == 0 ? 0 : ((double) etapasConcluidas / totalEtapas) * 100;
    }

    // Getters e setters
    public Long getObraId() {
        return obraId;
    }

    public void setObraId(Long obraId) {
        this.obraId = obraId;
    }

    public String getNomeObra() {
        return nomeObra;
    }

    public void setNomeObra(String nomeObra) {
        this.nomeObra = nomeObra;
    }

    public int getTotalEtapas() {
        return totalEtapas;
    }

    public void setTotalEtapas(int totalEtapas) {
        this.totalEtapas = totalEtapas;
    }

    public int getEtapasConcluidas() {
        return etapasConcluidas;
    }

    public void setEtapasConcluidas(int etapasConcluidas) {
        this.etapasConcluidas = etapasConcluidas;
    }

    public double getPercentualConcluido() {
        return percentualConcluido;
    }

    public void setPercentualConcluido(double percentualConcluido) {
        this.percentualConcluido = percentualConcluido;
    }
}
